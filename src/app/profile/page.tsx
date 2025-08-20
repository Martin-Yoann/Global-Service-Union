import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import EditProfileButton from "../../components/EditProfileButton";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return (
      <p className="p-6 text-center text-red-500">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <main className="container max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex items-center space-x-6 mb-6">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.firstName || user.username || "User Avatar"}
            width={96}
            height={96}
            className="rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-4xl">
            {(user.firstName || user.username || "U")[0]}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold">
            {user.firstName || user.username}
          </p>
          <p className="text-sm text-gray-500">
            {user.emailAddresses?.[0]?.emailAddress}
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3">Basic Info</h2>
        <dl className="grid grid-cols-2 gap-4 text-gray-700">
          <dt className="font-medium">Username</dt>
          <dd>{user.username || "Not set"}</dd>

          <dt className="font-medium">Name</dt>
          <dd>{user.firstName || "Not set"}</dd>

          <dt className="font-medium">Email</dt>
          <dd>{user.emailAddresses?.[0]?.emailAddress || "Not linked"}</dd>

          <dt className="font-medium">Joined At</dt>
          <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
        </dl>
      </section>

      <div className="mt-8 flex justify-end">
        <EditProfileButton />
      </div>
    </main>
  );
}
