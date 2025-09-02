/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true, // 忽略 ESLint 错误
    },
    typescript: {
      ignoreBuildErrors: true, // 忽略 TS 错误
    },
  };
  
  module.exports = nextConfig;
  