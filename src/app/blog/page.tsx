"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const posts = [
  {
    id: "1",
    title: "The Transformation of Smart Logistics",
    cover: "/blog1.jpg",
    excerpt:
      "Automation, robotics, and data intelligence are redefining logistics— from autonomous warehousing to last-mile delivery.",
    date: "2025-02-15",
    tags: ["Logistics", "Automation", "AI"],
  },
  {
    id: "2",
    title: "New Opportunities in Digital Marketing",
    cover: "/blog2.jpg",
    excerpt:
      "AI-driven targeting and creative generation are reshaping growth playbooks for modern brands.",
    date: "2025-03-01",
    tags: ["Marketing", "Digital", "AI"],
  },
  {
    id: "3",
    title: "Future of Warehouse Management",
    cover: "/blog3.jpg",
    excerpt:
      "Green operations and smarter inventory systems deliver both efficiency and sustainability.",
    date: "2025-04-10",
    tags: ["Warehousing", "Sustainability", "Management"],
  },
  {
    id: "4",
    title: "HR’s Digital Transformation",
    cover: "/blog4.jpg",
    excerpt:
      "Analytics-powered tools elevate decision-making and upgrade employee experience end-to-end.",
    date: "2025-05-05",
    tags: ["HR", "Digital", "EX"],
  },
  {
    id: "5",
    title: "Cross-border E-commerce Logistics Challenges",
    cover: "/blog5.jpg",
    excerpt:
      "From customs complexity to delivery reliability—smart solutions keep global commerce moving.",
    date: "2025-06-18",
    tags: ["Cross-border", "Logistics", "Smart"],
  },
  {
    id: "6",
    title: "Brand Building Strategies that Stick",
    cover: "/blog6.jpg",
    excerpt:
      "Distinctive identity, consistent storytelling, and social channels drive durable brand equity.",
    date: "2025-07-08",
    tags: ["Brand", "Marketing", "Social"],
  },
];

// unique tags (sorted)
const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

const PAGE_SIZE = 3;

export default function BlogPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // filter by tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((p) => selectedTags.every((tag) => p.tags.includes(tag)));
  }, [selectedTags]);

  // paginate
  const pagedPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);

  function toggleTag(tag: string) {
    setPage(1);
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const featuredPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-gray-100 to-gray-200 text-gray-900 px-6 py-16">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-14 tracking-tight text-blue-700"
      >
        Inspiration Notes · Blog
      </motion.h1>

      {/* Featured */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold mb-8 text-blue-700 border-l-4 border-blue-600 pl-4">
          Featured Picks
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image src={post.cover} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <time className="block mb-2 text-sm text-blue-500 font-mono">
                  {new Date(post.date).toLocaleDateString("en-US")}
                </time>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Tag filters */}
      <section className="max-w-4xl mx-auto mb-12 flex flex-wrap justify-center gap-3">
        {allTags.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1 rounded-full text-sm border transition 
                ${
                  selected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
                }`}
            >
              #{tag}
            </button>
          );
        })}
      </section>

      {/* Posts grid */}
      <section className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {pagedPosts.map((post) => {
          const isActive = activeId === post.id;
          return (
            <motion.article
              key={post.id}
              layout
              onHoverStart={() => setActiveId(post.id)}
              onHoverEnd={() => setActiveId(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl cursor-pointer shadow-md bg-white overflow-hidden transition-all ${
                isActive ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <div className="relative h-44 w-full">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <time className="block mb-2 text-sm text-blue-600 font-mono">
                  {new Date(post.date).toLocaleDateString("en-US")}
                </time>
                <h2 className="text-lg font-bold mb-2 text-gray-900">{post.title}</h2>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="max-w-4xl mx-auto mt-12 flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md border text-sm ${
              page === 1
                ? "opacity-40 cursor-not-allowed"
                : "border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md border text-sm ${
              page === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            Next
          </button>
        </nav>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-24 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 rounded-2xl shadow-lg"
      >
        <p className="mb-6 font-semibold tracking-wide text-lg">
          Enjoy the content? Subscribe for fresh insights!
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-gray-100 transition">
          Subscribe Now
        </button>
      </motion.div>
    </main>
  );
}
