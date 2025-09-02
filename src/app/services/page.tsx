"use client";
export const runtime = 'edge';
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function DownloadCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fileType, setFileType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 文件列表
  const files = [
    { id: 1, name: "CS Brand", type: "Excel", path: "/files/CS Brand.xlsx" },
    {
      id: 2,
      name: "Membership Guidelines invoice",
      type: "PDF",
      path: "/files/invoice.pdf",
    },
    {
      id: 3,
      name: "New Employee IT Training Materials",
      type: "Word",
      path: "/files/New Employee IT Training Materials.docx",
    },
    {
      id: 4,
      name: "Sales Training Manual",
      type: "Word",
      path: "/files/Sales Training Manual.docx",
    },
    {
      id: 5,
      name: "Training materials for marketing personnel",
      type: "Word",
      path: "/files/Training materials for marketing personnel.docx",
    },
    {
      id: 6,
      name: "Introduction to Accounting",
      type: "Word",
      path: "/files/Introduction to Accounting.docx",
    },
    {
      id: 7,
      name: "Internal Auditor Training Materials",
      type: "Word",
      path: "/Internal Auditor Training Materials.docx",
    },
    {
      id: 8,
      name: "Human Resource Planning",
      type: "Word",
      path: "/Human Resource Planning.docx",
    },
    {
      id: 9,
      name: "20 Principles Every Product Manager Must Know",
      type: "Word",
      path: "/20 Principles Every Product Manager Must Know.docx",
    },
    {
      id: 10,
      name: "Team Photo",
      type: "Image",
      path: "/files/team-photo.jpg",
    },
  ];

  const typeColors: Record<string, string> = {
    Excel: "bg-green-50 text-green-700 border border-green-200",
    PDF: "bg-red-50 text-red-700 border border-red-200",
    Word: "bg-blue-50 text-blue-700 border border-blue-200",
    Image: "bg-purple-50 text-purple-700 border border-purple-200",
  };

  const fileCategories = [
    {
      title: "Training Materials",
      description: "Comprehensive resources for employee and team training.",
      icon: "📘",
    },
    {
      title: "Company Guidelines",
      description: "Company policies, guidelines, and corporate documentation.",
      icon: "📄",
    },
    {
      title: "Reports & Analysis",
      description: "Sales, finance, and operational performance documents.",
      icon: "📊",
    },
  ];

  // 搜索+类型筛选逻辑
  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchSearch =
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = fileType === "All" || file.type === fileType;
      return matchSearch && matchType;
    });
  }, [searchTerm, fileType, files]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFiles.slice(start, start + itemsPerPage);
  }, [currentPage, filteredFiles]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/donate-hero.jpg"
            alt="Corporate Banner"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-28 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Corporate Download Center
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Access essential company documents, training manuals, and reports in
            one place.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Welcome to the Resource Hub
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Here you can easily find and download company resources, training
          materials, and official guidelines. Whether you're a new employee or a
          seasoned team member, our resource hub ensures everyone stays aligned
          with company standards and best practices.
        </p>
      </section>

      {/* File Categories */}
      <section className="max-w-6xl mx-auto px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fileCategories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {cat.title}
            </h3>
            <p className="text-gray-600">{cat.description}</p>
          </div>
        ))}
      </section>

      {/* Search + Filter */}
      <section className="max-w-6xl mx-auto px-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* 搜索框 */}
        <div className="relative w-full sm:w-1/2">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search files by name or type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-200 ease-in-out text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* 类型筛选下拉框 */}
        <div className="relative w-full sm:w-48">
          <select
            value={fileType}
            onChange={(e) => {
              setFileType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 text-gray-700 cursor-pointer transition duration-200 ease-in-out"
          >
            <option value="All">📂 All Types</option>
            <option value="Word">📝 Word</option>
            <option value="PDF">📕 PDF</option>
            <option value="Excel">📊 Excel</option>
            <option value="Image">🖼️ Image</option>
          </select>
          {/* 下拉箭头 */}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            ▼
          </span>
        </div>
      </section>

      {/* Download Table */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="px-8 py-5 text-left text-lg font-semibold text-gray-800 border-b">
                    File Name
                  </th>
                  <th className="px-8 py-5 text-left text-lg font-semibold text-gray-800 border-b">
                    Type
                  </th>
                  <th className="px-8 py-5 text-center text-lg font-semibold text-gray-800 border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedFiles.map((file, index) => (
                  <tr
                    key={file.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    <td className="px-8 py-5 text-gray-900 font-medium border-b">
                      {file.name}
                    </td>
                    <td className="px-8 py-5 border-b">
                      <span
                        className={`px-3 py-1.5 text-sm font-medium rounded-md ${typeColors[file.type]}`}
                      >
                        {file.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center border-b">
                      <Link
                        href={file.path}
                        target="_blank"
                        download
                        className="inline-block px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg shadow hover:bg-gray-800 transition"
                      >
                        Download
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {/* 上一页按钮 */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              ← 上一页
            </button>

            {/* 页码按钮 */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border transition font-medium ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* 下一页按钮 */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              下一页 →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
