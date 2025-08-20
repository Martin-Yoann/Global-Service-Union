"use client";

import Link from "next/link";

export default function DonateCancel() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-red-700 mb-4">Donation Cancelled</h1>
      <p className="text-lg text-red-800 mb-8 max-w-xl text-center">
        It seems like you cancelled the donation process. If this was a mistake, feel free to try again.
      </p>
      <Link
        href="/donate"
        className="inline-block bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700 transition"
      >
        Return to Donate Page
      </Link>
    </main>
  );
}
