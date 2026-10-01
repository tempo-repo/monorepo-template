import { defineConfig } from 'eslint/config';

import { testFilesPlacement } from './test-files-placement.mjs';

/**
 * This extends ESLint with repo-dedicated rules.
 */
const customEslintExtensions = defineConfig([...testFilesPlacement]);
export default customEslintExtensions;
