/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 忽略 ESLint 错误
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略 TS 错误
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'b2b-jiameng.su.bcebos.com' },
      { protocol: 'https', hostname: 'p5.itc.cn' },
      { protocol: 'https', hostname: 'q0.itc.cn' },
      { protocol: 'https', hostname: 'p6.itc.cn' },
      { protocol: 'https', hostname: 'img0.baidu.com' },
      { protocol: 'https', hostname: 'img1.baidu.com' },
      { protocol: 'https', hostname: 'img2.baidu.com' },
    ],
  },
  devIndicators: false, // 禁用左下角开发指示器
};

module.exports = nextConfig;
