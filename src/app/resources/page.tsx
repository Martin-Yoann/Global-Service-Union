import { currentUser } from "@clerk/nextjs/server";

export default async function ResourcesPage() {
  const user = await currentUser();
  if (!user) return <p>请先登录</p>;

  return (
    <main className="container max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">联盟资源</h1>
      <p className="text-gray-700 mb-4">以下是会员专属资源，敬请使用：</p>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li><a href="/downloads/resource1.pdf" className="text-indigo-600 underline">资源包1（PDF）</a></li>
        <li><a href="/downloads/resource2.zip" className="text-indigo-600 underline">素材包2（ZIP）</a></li>
        <li><a href="/tutorials/video1" className="text-indigo-600 underline">教程视频1</a></li>
      </ul>
    </main>
  );
}
