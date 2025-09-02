export const runtime = 'edge';

import { currentUser } from "@clerk/nextjs/server";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) return <p>请先登录</p>;

  return (
    <main className="container max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">账户设置</h1>
      <p className="mb-4">在这里您可以修改账户相关信息和安全设置（演示版）</p>
      {/* 真实项目中可集成表单与API */}
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>修改用户名、头像</li>
        <li>更改密码</li>
        <li>绑定手机与邮箱</li>
        <li>安全登录设置</li>
      </ul>
    </main>
  );
}
