"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section
      aria-labelledby="mission-title"
      className="bg-[#DFEAFF] py-20 px-6 md:px-12 text-center !mt-0"
    >
      <motion.h2
        id="mission-title"
        className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Our Mission
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        To connect global businesses, empower seamless collaboration, and simplify global partnerships.
      </motion.p>
    </section>
  );
}
