/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
    },
    typescript: {
      ignoreBuildErrors: true, // 构建时忽略 TS 错误
    },
    experimental: {
      instrumentationHook: true, // next-on-pages 需要
    },
  };
  
  module.exports = nextConfig;
  