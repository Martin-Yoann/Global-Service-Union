// src/app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

export default async function DashboardPage() {
  const user = await currentUser();
  const welcomeName = user?.firstName || user?.username || "Member";

  // 模拟数据，替换成真实API
  const myQuestions = [
    { id: "q1", title: "How to improve React performance?", createdAt: "2025-07-01" },
    { id: "q2", title: "Best practices for Next.js API routes?", createdAt: "2025-06-28" },
  ];
  const myAnswers = [
    { id: "a1", questionTitle: "What is Server Components?", snippet: "Server Components allow rendering...", createdAt: "2025-07-02" },
  ];
  const notifications = [
    { id: "n1", content: "Your question got a new answer.", date: "2025-07-15" },
    { id: "n2", content: "New resource added to Alliance Resources.", date: "2025-07-10" },
  ];
  const unreadMessagesCount = 3;
  const totalResources = 12;

  return (
    <main className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 顶部欢迎卡片 */}
        <Card className="w-full rounded-md shadow-md border border-gray-200 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 mb-10">
          <CardHeader className="flex items-center space-x-4 border-b border-gray-100 pb-4">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={welcomeName}
                width={56}
                height={56}
                className="rounded-full border-2 border-indigo-500"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                {welcomeName[0]}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Welcome to Alliance Member Center
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {user ? "Exclusive area for members" : "Please sign in to access member features"}
              </p>
            </div>
          </CardHeader>
          <CardContent className="py-6 px-8">
            {user ? (
              <div className="space-y-6 text-center">
                <p className="text-lg text-gray-900">
                  Hello, <span className="text-indigo-600 font-semibold">{welcomeName}</span> 👋
                </p>
                <p className="text-sm text-gray-500">
                  Last sign-in: {new Date(user.lastSignInAt!).toLocaleString()}
                </p>
                {/* 快速导航按钮 */}
                <div className="flex justify-center space-x-6">
                  <Button asChild variant="outline" className="w-40 h-12">
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button asChild className="w-40 h-12">
                    <Link href="/services">Manage Services</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-40 h-12">
                    <Link href="/messages">
                      Messages{" "}
                      {unreadMessagesCount > 0 && (
                        <span className="ml-1 inline-block bg-red-600 text-white text-xs rounded-full px-2">
                          {unreadMessagesCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 text-center">
                <p className="text-red-600 font-semibold text-lg">
                  Login required to access this page
                </p>
                <div className="flex justify-center space-x-6">
                  <Button asChild variant="outline" className="w-36">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild className="w-36">
                    <Link href="/sign-up">Register</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {user && (
          <>
            {/* 数据总览区 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatsCard title="My Questions" value={myQuestions.length} href="/questions" />
              <StatsCard title="My Answers" value={myAnswers.length} href="/answers" />
              <StatsCard title="Messages" value={unreadMessagesCount} href="/messages" />
              <StatsCard title="Resources" value={totalResources} href="/resources" />
            </div>

            {/* 主体区 - 三栏布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧 - 我的提问 */}
              <section>
                <SectionCard title="My Questions">
                  {myQuestions.length === 0 ? (
                    <p className="text-gray-500 italic">You haven't asked any questions yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {myQuestions.map((q) => (
                        <li key={q.id}>
                          <Link href={`/questions/${q.id}`} className="text-indigo-600 hover:underline font-semibold">
                            {q.title}
                          </Link>
                          <div className="text-xs text-gray-400">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </SectionCard>
              </section>

              {/* 中间 - 最近活动 */}
              <section>
                <SectionCard title="Recent Activity">
                  <ul className="space-y-4 text-sm">
                    {[
                      ...myQuestions.map((q) => ({ type: "Question", text: q.title, date: q.createdAt })),
                      ...myAnswers.map((a) => ({ type: "Answer", text: a.snippet, date: a.createdAt })),
                      ...notifications.map((n) => ({ type: "Notification", text: n.content, date: n.date })),
                    ]
                      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
                      .map((item, idx) => (
                        <li key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                          <span className="font-medium text-indigo-600">{item.type}:</span> {item.text}
                          <div className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</div>
                        </li>
                      ))}
                  </ul>
                </SectionCard>
              </section>

              {/* 右侧 - 通知和推荐 */}
              <section className="space-y-8">
                <SectionCard title="Notifications">
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 italic">No notifications</p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {notifications.map((n) => (
                        <li key={n.id} className="border-b border-gray-100 pb-2 last:border-0">
                          {n.content}
                          <div className="text-xs text-gray-400">{new Date(n.date).toLocaleDateString()}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </SectionCard>

                <SectionCard title="Recommended Resources">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/resources/react-guide" className="text-indigo-600 hover:underline">
                        React Advanced Guide
                      </Link>
                      <div className="text-xs text-gray-400">Updated July 2025</div>
                    </li>
                    <li>
                      <Link href="/resources/nextjs-patterns" className="text-indigo-600 hover:underline">
                        Next.js Best Practices
                      </Link>
                      <div className="text-xs text-gray-400">Updated June 2025</div>
                    </li>
                  </ul>
                </SectionCard>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

/* ====== 抽象组件 ====== */
function StatsCard({ title, value, href }: { title: string; value: number; href: string }) {
  return (
    <Link href={href} className="block">
      <Card className="p-6 text-center bg-white shadow hover:shadow-md transition rounded-md">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-3xl font-bold text-indigo-600">{value}</p>
      </Card>
    </Link>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-white p-4 shadow-sm rounded-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">{title}</h2>
      {children}
    </Card>
  );
}
