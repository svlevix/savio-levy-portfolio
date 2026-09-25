import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  experimental: { useTypeScriptCli: false, webpackBuildWorker: false, workerThreads: true, cpus: 2 },
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;


