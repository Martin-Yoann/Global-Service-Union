"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function EventsPage() {
  const events = [
    {
      img: "https://b2b-jiameng.su.bcebos.com/2023/11/28/5eaafcee592990a4ed033213473296a82a6a843a?authorization=bce-auth-v1%2F68bd701e850341f68e6f82b042f89c46%2F2023-11-28T09%3A36%3A08Z%2F-1%2Fhost%2F3bae04c5b58bada68576e2d438cdb18faee228859c429197c68a141905b07456",
      title: "Global Logistics Summit 2025",
      date: "March 15, 2025",
      desc: "Explore logistics trends and discuss the future of global supply chains.",
    },
    {
      img: "https://p5.itc.cn/q_70/images01/20240101/5e2843cce914414592ce8cea39050b07.png",
      title: "Warehouse Tech Expo",
      date: "May 10, 2025",
      desc: "Showcasing automation, smart warehousing, and the latest industry solutions.",
    },
    {
      img: "https://q0.itc.cn/images01/20240923/2ded275416d748139dde3d2abb823802.jpeg",
      title: "Marketing Innovation Forum",
      date: "July 21, 2025",
      desc: "Digital marketing and AI-powered insights for industry leaders.",
    },
    {
      img: "https://p6.itc.cn/q_70/images01/20231009/f92c2a09b43249d2a065d638fddb8b8d.jpeg",
      title: "HR Digital Transformation",
      date: "Sept 9, 2025",
      desc: "Explore future HR trends and intelligent workforce management.",
    },
  ];

  const partners = [
    "https://img2.baidu.com/it/u=3027239514,3176309614&fm=253&fmt=auto&app=138&f=JPEG?w=778&h=500",
    "https://img0.baidu.com/it/u=3458891355,1554920117&fm=253&fmt=auto&app=120&f=JPEG?w=749&h=500",
    "https://img2.baidu.com/it/u=474216453,4035769375&fm=253&fmt=auto&app=120&f=JPEG?w=888&h=500",
    "https://img1.baidu.com/it/u=3195134343,1477902083&fm=253&fmt=auto&app=138&f=JPEG?w=596&h=500",
  ];

  const timeline = [
    {
      time: "09:00 AM",
      title: "Check-in & Welcome Coffee",
      desc: "Register, collect materials, and network with peers.",
    },
    {
      time: "10:00 AM",
      title: "Opening Ceremony & Keynote",
      desc: "Industry leaders share insights on global logistics trends.",
    },
    {
      time: "01:00 PM",
      title: "Specialized Forums & Workshops",
      desc: "Deep dive into specific industry segments and discussions.",
    },
    {
      time: "06:00 PM",
      title: "Networking Dinner",
      desc: "Connect with industry professionals and expand your network.",
    },
  ];

  return (
    <main className="relative bg-gradient-to-tr from-[#0f172a] to-[#3b82f6] min-h-screen text-white select-none">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[70vh] px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-[-15vw] w-[130vw] h-[130vh] bg-gradient-to-r from-indigo-700 via-blue-500 to-purple-600 -skew-y-12 -z-10 rounded-3xl shadow-xl"></div>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold text-center max-w-4xl leading-tight drop-shadow-lg"
        >
          Join Our Global Events
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 max-w-2xl text-center text-lg md:text-xl tracking-wide"
        >
          Attend top industry summits, discover latest trends, and expand your global network.
        </motion.p>
      </section>

      {/* Events Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
            className="relative bg-gradient-to-br from-indigo-700 to-blue-600 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-white/20 backdrop-blur-md rounded-bl-3xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)" }}
            ></div>
            <div className="relative z-10">
              <div className="relative w-full h-60 rounded-t-3xl overflow-hidden">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-indigo-300 mb-1 font-semibold tracking-widest">
                  {event.date}
                </p>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-indigo-100 text-sm">{event.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto my-20 px-6 relative z-20">
        <h2 className="text-4xl font-extrabold mb-12 text-center tracking-wide">
          Event Schedule
        </h2>

        <div className="relative border-l-4 border-indigo-400 ml-6">
          {timeline.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className={`mb-12 relative w-full max-w-lg ${idx % 2 === 0 ? "ml-10" : "ml-[4rem]"}`}
            >
              <div
                className="absolute -left-[2.1rem] top-3 w-5 h-5 rounded-full bg-indigo-600 border-2 border-white"
                aria-hidden="true"
              />
              <time className="block mb-1 text-indigo-300 font-mono tracking-wide">
                {step.time}
              </time>
              <h3 className="text-2xl font-semibold mb-1">{step.title}</h3>
              <p className="text-indigo-200">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-indigo-900 bg-opacity-80 py-12">
        <h2 className="text-center text-3xl font-extrabold mb-10 tracking-widest text-indigo-200">
          Our Partners
        </h2>
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <motion.div
            animate={{ x: [0, -300, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {partners.concat(partners).map((logo, i) => (
              <div
                key={i}
                className="inline-block flex-shrink-0 w-36 h-20 relative filter brightness-90 hover:brightness-110 transition cursor-pointer"
              >
                <Image
                  src={logo}
                  alt={`Partner ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="144px"
                  priority={i < partners.length}
                />
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-indigo-900" />
          <div className="pointer-events-none absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-indigo-900" />
        </div>
      </section>

      {/* Fixed CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <button
          type="button"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-4 rounded-full font-extrabold shadow-lg hover:scale-105 transition-transform"
        >
          Register Now & Secure Your Seat!
        </button>
      </motion.div>
    </main>
  );
}
