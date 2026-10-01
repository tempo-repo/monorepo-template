import checkFile from 'eslint-plugin-check-file';
import { defineConfig } from 'eslint/config';

/**
 * This ensures, that all .test.{ts,tsx} files are placed in
 * single ``__tests__`` folder, not alongside the source files.
 */
export const testFilesPlacement = defineConfig([
  {
    name: 'Tests file placement convention',
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-match-with-fex': [
        'error',
        {
          // Ensure .test.ts and .test.tsx files live ONLY in a __tests__ folder
          '**/*.test.{ts,tsx}': '__tests__/**',
        },
      ],
    },
  },
]);
