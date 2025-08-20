/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有外部图片源
      },
    ],
  },
  // 生产环境优化
  productionBrowserSourceMaps: false, 
}
module.exports = nextConfig