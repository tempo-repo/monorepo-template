import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
};

export default nextConfig;
