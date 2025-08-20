"use client";

import { useRouter } from "next/navigation";

export default function EditProfileButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/profile/edit")}
      className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      type="button"
    >
      Edit Profile
    </button>
  );
}
