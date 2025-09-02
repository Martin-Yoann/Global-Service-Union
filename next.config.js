/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      instrumentationHook: true, // next-on-pages 需要
    },
  };
  
  module.exports = nextConfig;
  