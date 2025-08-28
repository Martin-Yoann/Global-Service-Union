"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const stats = [
    { label: "Global Clients", value: 30 },
    { label: "Countries Covered", value: 5 },
  ];


  return (
    <main className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-gray-100 min-h-screen pt-24 pb-16">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          About US
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
        Global Business Association & Education Center is a non-profit organization duly established under the Texas Business Organizations Code and the U.S. 
        Internal Revenue Code, dedicated to promoting international business education, philanthropic initiatives, and cross-cultural exchange. 
        The platform operates on a non-profit basis, with funding derived from non-profit organizations and public donations.

        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
        No part of the net earnings of the organization shall inure to the benefit of any director, officer, member, or private individual.
In the event of dissolution, the assets of the organization shall be distributed to one or more organizations qualified as tax-exempt under the U.S. Internal Revenue Code, to be used for exempt purposes, or to the federal, state, or local government for public use.
        </p>
      </motion.section>

      {/* Hero Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <div className="relative w-full max-w-5xl">
          <Image
            src="/about-hero.jpg"
            alt="About GSU"
            width={1200}
            height={600}
            className="rounded-xl shadow-2xl border border-white/20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-16 px-4"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} />
        ))}
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 mt-20 grid md:grid-cols-2 gap-12"
      >
        <InfoCard
          title="Our Mission"
          text="Our mission: To connect global businesses, empower seamless collaboration, and simplify global partnerships."
        />
        <InfoCard
          title="Our Vision"
          text="Our Vision: A globally connected business ecosystem enabling shared prosperity."
        />
      </motion.section>

      {/* Timeline Section (Tabs) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-24 px-4"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">
          Our Story
        </h2>
        <TimelineTabs />
      </motion.section>
    </main>
  );
}

/* ---------------- 子组件 ---------------- */
function StatCard({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
      <p className="text-4xl font-bold text-indigo-600">{count}+</p>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

/* ---------------- TimelineTabs ---------------- */
function TimelineTabs() {
  const events = [
    { year: "2022", text: "The Spark of Collaboration The vision for the Global Service Alliance took shape in 2022. By bringing together multiple cross-border trading companies, we discovered powerful synergies across different sectors. These early collaborations—where businesses supported each other and achieved mutual growth—inspired our foundational concept." },
    { year: "2023", text: "Official Launch The alliance was formally established in 2023 with a clear mission: to connect global resources and empower small and medium-sized enterprises in expanding internationally." },
    { year: "2024", text: "Expanding Reach and Membership We extended our network into key international markets, including China, the United States, Canada, and the United Kingdom. Within a year, our community grew to include over 20 dedicated members. " },
    { year: "2025", text: "Innovation and Integrity We’re continuously enhancing our processes and protocols, achieving a false information interception rate of nearly 90% and increasing user retention from 3 to 10 months. We’re also developing a user credit scoring system and establishing industry-wide data-sharing standards—paving the way for the future of global business." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {events.map((event, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeIndex === i
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
            }`}
          >
            {event.year}
          </button>
        ))}
      </div>

      {/* 内容 */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl text-center"
      >
        <p className="text-gray-700 dark:text-gray-300">{events[activeIndex].text}</p>
      </motion.div>
    </div>
  );
}
