import { bold } from 'ansi-colors';
import { closeSync, existsSync } from 'node:fs';
import { open, readFile, writeFile } from 'node:fs/promises';
import * as path from 'node:path';

import { DevLogger } from '@scripts/impl';

// Targets` names
const TARGET = '.env';
const EXAMPLE_TARGET = '.env.example';

(async () => {
  DevLogger.start(
    `${bold(EXAMPLE_TARGET)} will be created from ${bold(TARGET)}`,
  );

  // Start searching for .env file.

  DevLogger.log(`Looking for ${bold(TARGET)} file in "${process.cwd()}"`);

  // Target file does not exist
  if (!existsSync(path.join(process.cwd(), TARGET))) {
    DevLogger.error(`${bold(TARGET)} does not exist.`);
    return;
  }

  /** Read target content as text. */
  const envContent = await readFile(path.join(process.cwd(), TARGET), {
    encoding: 'utf-8',
  });
  /** Process lines to change sensitive data. */
  const lines = envContent.split(/\n/gi).map(item => {
    // Line does not contain any variables.
    if (!/(^\w+=(".*)"$)|(^\w+=(.*)$)/gi.test(item)) {
      return item;
    }

    const [name] = item.split(/(((?<=\w+=")(.*)(?="))|((?<=\w+=)(.*)(?=)))/gi);
    const assignment: string | undefined =
      `"YOUR_${name?.toUpperCase().replace(/=$/gi, '')}"`;

    return `${name}${assignment}`;
  });

  // Check if output file exists
  if (!existsSync(path.join(process.cwd(), EXAMPLE_TARGET))) {
    DevLogger.warn(`${bold(EXAMPLE_TARGET)} does not exist. Creating it.`);
    const file = await open(path.join(process.cwd(), EXAMPLE_TARGET), 'w');
    closeSync(file.fd);
  }

  // Update file
  await writeFile(
    path.join(path.join(process.cwd(), EXAMPLE_TARGET)),
    lines.join('\n'),
  );

  DevLogger.end(`${bold('.env.example')} has been successfully updated.`);
})();
