import { currentUser } from "@clerk/nextjs/server";

export default async function ProjectsPage() {
  const user = await currentUser();
  if (!user) return <p>请先登录</p>;

  // 这里你可以拉取用户项目列表，演示简单静态
  const projects = [
    { id: 1, name: "项目A", desc: "项目A的描述" },
    { id: 2, name: "项目B", desc: "项目B的描述" },
  ];

  return (
    <main className="container max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">我的项目</h1>
      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="p-4 border rounded hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.desc}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
