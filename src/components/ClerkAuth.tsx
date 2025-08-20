"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";

export default function ClientAuth() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // SSR时不渲染任何内容，防止不一致
    return null;
  }
  return (
    <div className="flex items-center gap-3">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-in"
          className="text-indigo-600 border border-indigo-600 px-3 py-1 rounded hover:bg-indigo-50 transition text-sm"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm"
        >
          Sign Up
        </Link>
      </SignedOut>
    </div>
  );
}
