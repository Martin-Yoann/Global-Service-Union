"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  if (!user) {
    return (
      <p className="p-6 text-center text-red-500">
        Please log in to edit your profile
      </p>
    );
  }

  async function handleSave() {
    try {
      // ✅ update text fields
      if (!user) {
        throw new Error("User not found");
      }
      
      await user.update({
        username,
        firstName,
      });
      

      // ✅ update avatar if uploaded
      if (avatarFile) {
        await user.setProfileImage({ file: avatarFile });
      }

      // ✅ update email
      if (email && email !== user.primaryEmailAddress?.emailAddress) {
        await user.createEmailAddress({ email });
      }

      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (err: any) {
      alert("Error updating profile: " + err.message);
    }
  }

  return (
    <main className="container max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => router.push("/profile")}
          className="px-5 py-2 border rounded hover:bg-gray-100"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          type="button"
        >
          Save
        </button>
      </div>
    </main>
  );
}
