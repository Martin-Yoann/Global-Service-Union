"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaHandshake, FaMedal } from "react-icons/fa";

const features = [
  {
    title: "Open Collaboration",
    // description: "Connecting organizations across continents for mutual benefit.",
    icon: FaGlobe,
  },
  {
    title: "Knowledge Sharing & Global Growth",
    // description: "Ensuring openness and accountability among members.",
    icon: FaHandshake,
  },
  {
    title: "Value Co-creation",
    // description: "Boosting the visibility and impact of service alliances worldwide.",
    icon: FaMedal,
  },
];

// 动画 variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
export default function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="bg-gray-50 py-16 px-6 md:px-12"
    >
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2
          id="features-title"
          className="text-3xl font-bold text-gray-800 tracking-tight"
        >
          Key Values
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          What makes our alliance stand out
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map(({ title, description, icon: Icon }, idx) => (
          <motion.article
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-default flex flex-col items-center text-center"
            variants={itemVariants}
            tabIndex={0} // 让卡片可聚焦，提高无障碍
            role="region"
            aria-labelledby={`feature-title-${idx}`}
          >
            <div className="text-indigo-600 mb-4">
              <Icon size={40} aria-hidden="true" />
            </div>
            <h3
              id={`feature-title-${idx}`}
              className="text-xl font-semibold text-indigo-700 mb-2"
            >
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
