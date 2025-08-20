import { currentUser } from "@clerk/nextjs/server";

export default async function NotificationsPage() {
  const user = await currentUser();
  if (!user) return <p>Please log in first.</p>;

  // Sample notifications
  const notifications = [
    { id: 1, text: "Your Project A received a new comment", read: false },
    { id: 2, text: "Alliance event is about to start", read: true },
  ];

  return (
    <main className="container max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((note) => (
          <li
            key={note.id}
            className={`p-4 rounded border ${
              note.read
                ? "bg-gray-100 border-gray-200"
                : "bg-indigo-50 border-indigo-300"
            }`}
          >
            {note.text}
          </li>
        ))}
      </ul>
    </main>
  );
}

