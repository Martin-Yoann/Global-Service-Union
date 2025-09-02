"use client";

import Link from "next/link";

export default function DonateSuccess() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You for Your Donation!</h1>
      <p className="text-lg text-green-800 mb-8 max-w-xl text-center">
        Your generous contribution helps support the mission of Business Association .
        We truly appreciate your support.
      </p>
      <Link
        href="/"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition"
      >
        Return to Home
      </Link>
    </main>
  );
}
