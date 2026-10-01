import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    env: {
      NEXT_PUBLIC_CANONICAL_URL: 'http://localhost:4444',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'json-summary', 'html'],
      include: ['./src/**/*.{ts,js,tsx,jsx}'],
      exclude: [
        '**/*.{stories,variants}.*',
        './src/stories/*',

        // TODO Maybe, should add routing files to coverage report...
        '**/{page,layout,route}.tsx',
        '**/{loading,error,not-found}.tsx',

        // Script files
        './src/scripts/*.script.ts',
        './src/scripts/impl/utils/write-package-json.ts',
        '**/SB_Preview.tsx',
      ],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
