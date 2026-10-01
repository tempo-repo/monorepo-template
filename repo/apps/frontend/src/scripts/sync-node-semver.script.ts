import { intersect } from '@voxpelli/semver-set';
import c from 'ansi-colors';
import axios from 'axios';
import deepmerge from 'deepmerge';
import { readFileSync } from 'node:fs';
import * as fs from 'node:fs';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { PackageJson } from 'type-fest';
import YAML from 'yaml';
import { z } from 'zod';

import { DevLogger, writePackageJson } from '@scripts/impl';

const ignoreVersion = (version: string): string => `<${version} || >${version}`;

function ltsOnly(): string[] {
  const list: string[] = [];

  for (const num in Array.from({ length: 30 })) {
    const idx = +num + 1;

    if (idx % 2 !== 0) {
      list.push(ignoreVersion(idx.toString()));
    }
  }

  return list;
}

async function parseLatestNodeVersion(): Promise<string | undefined> {
  const meta = await axios.get('https://nodejs.org/dist/index.json');
  const schema = z.array(
    z.object({
      version: z.string(),
    }),
  );
  const parsed = schema.parse(meta.data);
  const counted = parsed
    .map(i => ({
      version: i.version.replace(/^v/, ''),
      parts: i.version.replace(/^v/, '').split('.'),
    }))
    .map(({ version, parts: [major, minor, patch] }) => ({
      version,
      count: +major! * 100 + +minor! * 10 + +patch!,
    }))
    .sort((a, b) => b.count - a.count)
    .at(0)?.version;

  return counted;
}

(async () => {
  DevLogger.start('Calculating Node.js engine semver from dependencies');

  // Parse latest Node.js version
  const LATEST_NODE_VERSION = await parseLatestNodeVersion();
  DevLogger.info(
    `Latest available Node.js version: ${c.green.bold(LATEST_NODE_VERSION ?? 'unknown')}`,
  );

  const EXTRA_SEMVERS: string[] = [
    ...ltsOnly(),
    LATEST_NODE_VERSION ? `<${LATEST_NODE_VERSION}` : undefined,
    '>=22.22.1',
  ].filter(s => s !== undefined);

  const filenames = await readdir(process.cwd(), {
    recursive: true,
    withFileTypes: true,
  });
  const semvers = filenames
    .filter(file => path.basename(file.name) === 'package.json')
    .filter(f => f.isFile())
    .map(f => path.join(f.parentPath, f.name))
    .map(filename => ({
      filename,
      content: readFileSync(filename, {
        encoding: 'utf8',
      }),
    }))
    .map(f => {
      try {
        const parsedJson = JSON.parse(f.content) as PackageJson;

        return {
          filename: f.filename,
          content: parsedJson,
        };
      } catch (e) {
        DevLogger.warn(`Error handling \`${f.filename}\` (${e})`);
        return undefined;
      }
    })
    .filter(f => f !== undefined)
    .map(file => ({
      filename: file.filename,
      nodeEngines: file.content.engines?.node,
    }))
    .filter(file => file.nodeEngines !== undefined)
    .map(file => file.nodeEngines!);

  const collapsedSemver: string | null = intersect(
    ...semvers,
    ...EXTRA_SEMVERS,
  );
  if (!collapsedSemver) {
    DevLogger.error(
      c.yellow('Calculation seems to be null. Check the generation script.'),
    );
    return;
  }
  // Get all versions presented in semver
  const individualVersions = collapsedSemver
    .matchAll(/((\^|>=)(\d+\.*)+)/g)
    .map(arr => arr.at(0))
    .toArray()
    .filter(v => v !== undefined)
    .map(v => v.replace(/(\^|>=)/g, ''));

  await writePackageJson(path.join(process.cwd(), './package.json'), prev => {
    if (prev.engines?.node !== collapsedSemver) {
      DevLogger.log(
        c.gray(
          `Previous node engine requirement was ${c.green.bold(prev.engines?.node ?? 'unset')}`,
        ),
      );

      DevLogger.log(
        c.gray(
          `Set node engine requirement to ${c.green.bold(collapsedSemver)}`,
        ),
      );
    } else {
      DevLogger.warn(c.yellow('package.json is in sync already.'));
    }

    return deepmerge(prev, {
      engines: {
        node: collapsedSemver,
      },
    });
  });

  // Updating CI file
  try {
    const ciFilePath = path.join(process.cwd(), '.github/workflows/ci.yml');
    const ciFileContents = fs.readFileSync(ciFilePath, 'utf8');
    // Parse YAML
    const data = YAML.parse(ciFileContents);
    // Write new Node requirements
    data.jobs.ci.strategy.matrix.NODE_VERSION = individualVersions;
    const newContent: string = YAML.stringify(data, null, 2);
    await writeFile(ciFilePath, newContent);
    // Check if nothing changed
    const newFileContents = fs.readFileSync(ciFilePath, 'utf8');
    if (ciFileContents === newFileContents) {
      DevLogger.warn(c.yellow('ci.yml is in sync already.'));
    }
  } catch (e) {
    DevLogger.error(`Failed to parse ci.yml: ${e}`);
  }

  DevLogger.end('Calculation proceeded.');
})();
