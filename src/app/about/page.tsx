"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function AboutPage() {
  const stats = [
    { label: "Global Clients", value: 1200 },
    { label: "Warehouses", value: 85 },
    { label: "Countries Covered", value: 35 },
  ];
  const teamMembers = [
    { name: "Alice Johnson", role: "CEO", img: "https://img0.baidu.com/it/u=1595607778,3757335436&fm=253&fmt=auto&app=138&f=JPEG?w=285&h=285" },
    { name: "David Wang", role: "CTO", img: "https://img0.baidu.com/it/u=1595607778,3757335436&fm=253&fmt=auto&app=138&f=JPEG?w=285&h=285" },
    { name: "Sophia Chen", role: "Marketing Head", img: "https://img0.baidu.com/it/u=1595607778,3757335436&fm=253&fmt=auto&app=138&f=JPEG?w=285&h=285" },
  ];
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
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
          About Global Service Union
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Our mission :Connect global merchants, build efficient docking bridges, ,make global business cooperation easier.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        our vision: Connecting global business, To draw a prosperous future.
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
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 px-4"
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
          text="Our mission :Connect global merchants, build efficient docking bridges, ,make global business cooperation easier."
        />
        <InfoCard
          title="Our Vision"
          text="our vision: Connecting global business, To draw a prosperous future."
        />
      </motion.section>

      {/* Timeline Section */}
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
        <Timeline />
      </motion.section>

      {/* Team Section */}
      <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-4 mt-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100"
      >
        Meet Our Team
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }} // 悬停时放大和轻微上浮
            className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }} // 图片悬停动态效果
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={member.img}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full mx-auto shadow-lg mb-10"
              />
            </motion.div>
            <h3 className="mt-10 text-xl font-semibold">{member.name}</h3>
            <p className="text-indigo-600">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
    </main>
  );
}

/* ----------- 子组件保持不变 ----------- */
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

function Timeline() {
  const events = [
    { year: "2020", text: "The platform is officially established. Global Service Union was officially established in March 2020.In the initial stage, we will gather over 50 cross-border trade enterprises with the core goal of connecting global resources and assisting small and medium-sized enterprises in going global. " },
    { year: "2021", text: "Technology upgrade By introducing intelligent matching algorithms, the efficiency of order matching has been improved by 40%, the interception rate of false information has reached 98%, and the user retention period has been extended from 3 months to 12 months" },
    { year: "2022", text: "Globalization expansion Expand customer base in countries such as China, the United States, and the United Kingdom, covering the Asian and South American markets, and adding 1000 new merchants throughout the year." },
    { year: "2023", text: "Technology driven change Connected to the China UnionPay cross-border payment system, supporting real-time clearing of 46 currencies, shortening settlement cycles, and reducing transaction fees by 30%." },
    { year: "2024", text: "scale development The platform has accumulated over 10000 registered merchants, covering more than 20 industries such as fast-moving consumer goods, household goods, and digital services." },
    { year: "2025", text: "The future has arrived In the future, we will promote the platform's user credit scoring system and establish industry data sharing standards." },
  ];

  return (
    <div className="relative border-l-4 border-indigo-500 pl-6">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="absolute -left-4 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white"></div>
          <p className="text-indigo-600 font-bold">{event.year}</p>
          <p className="text-gray-700 dark:text-gray-300">{event.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
