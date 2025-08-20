// components/JoinUs.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function JoinUs() {
  return (
    <section
      aria-labelledby="joinus-title"
      className="bg-indigo-600 text-white py-16 text-center px-6 sm:px-12 md:px-24"
    >
      <motion.h2
        id="joinus-title"
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Ready to Collaborate?
      </motion.h2>

      <motion.p
        className="mb-6 max-w-2xl mx-auto text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Join our global network of service-based organizations and shape the future
        together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link
          href="/join"
          className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold 
            hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-300 
            transition-shadow active:scale-95"
          aria-label="Join the Alliance"
        >
          Join the Alliance
        </Link>
      </motion.div>
    </section>
  );
}
