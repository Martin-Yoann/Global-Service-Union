/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ 打包时忽略 ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ 打包时忽略 TS 错误
  },
  // ✅ 关闭 Next.js 右下角 Dev Tools 按钮
  devIndicators: false,

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
};

module.exports = nextConfig;
