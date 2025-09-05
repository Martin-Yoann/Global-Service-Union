"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  // 折叠状态控制
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-black text-white py-12 px-6 sm:px-12 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-20">
        {/* 1. Logo + 简介 */}
        <div
  className="
    flex-1 max-w-xs flex flex-col
    mx-auto                      
    items-center text-center     
    md:mx-0                     
    md:items-start md:text-left  
  "
>
  <img
    src="/logo-footer.svg"
    alt="GBAEC Logo"
    className="w-full max-w-[125px] h-auto object-contain"
  />
  <p className="text-gray-400 text-sm leading-relaxed mt-4">
    Uniting Service Businesses Across Borders
  </p>
</div>


        {/* 2. 菜单 (桌面端: 两列; 移动端: 折叠面板) */}
        <nav className="flex-1 min-w-[280px] text-gray-300 text-sm w-full">
          <div className="hidden md:grid grid-cols-2 gap-10">
            {/* 左侧菜单 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Main Menu</h3>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/events", label: "Events" },
                  { href: "/blog", label: "Blog" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 右侧菜单 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Membership</h3>
              <ul className="space-y-3">
                {[
                  { href: "/donate", label: "Donate" },
                  { href: "/join", label: "Join Us" },
                  { href: "/dashboard", label: "Alliance Center" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 移动端: 折叠面板 */}
          <div className="md:hidden space-y-4 mt-6">
            {/* Main Menu */}
            <div>
              <button
                onClick={() => toggleSection("main")}
                className="flex justify-between items-center w-full text-left text-lg font-semibold py-2 border-b border-gray-700"
              >
                Main Menu
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "main" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSection === "main"
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pl-2">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/events", label: "Events" },
                    { href: "/blog", label: "Blog" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Membership */}
            <div>
              <button
                onClick={() => toggleSection("membership")}
                className="flex justify-between items-center w-full text-left text-lg font-semibold py-2 border-b border-gray-700"
              >
                Membership
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "membership" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSection === "membership"
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pl-2">
                  {[
                    { href: "/donate", label: "Donate" },
                    { href: "/join", label: "Join Us" },
                    { href: "/dashboard", label: "Alliance Center" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <button
                onClick={() => toggleSection("contact")}
                className="flex justify-between items-center w-full text-left text-lg font-semibold py-2 border-b border-gray-700"
              >
                Contact Info
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "contact" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSection === "contact"
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-2 text-gray-400 text-sm pl-2">
                  <p>
                    1101 E Arapaho Rd
                    <br />
                    Richardson, TX 75081
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+1234567890"
                      className="hover:text-white transition-colors duration-200"
                    >
                      +1 (234) 567-890
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@globalserviceunion.org"
                      className="hover:text-white transition-colors duration-200"
                    >
                      info@globalserviceunion.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* 桌面端 Contact Info */}
        <address className="hidden md:block flex-1 max-w-sm text-gray-400 text-sm space-y-3 text-right not-italic md:-mr-24 lg:-mr-32">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact Info
          </h3>
          <p className="leading-relaxed">
            1101 E Arapaho Rd
            <br />
            Richardson, TX 75081
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="hover:text-white transition-colors duration-200"
            >
              +1 (234) 567-890
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@globalserviceunion.org"
              className="hover:text-white transition-colors duration-200"
            >
              info@globalserviceunion.org
            </a>
          </p>
        </address>
      </div>

      {/* 版权信息 */}
      <div className="mt-12 text-center text-gray-500 text-xs select-none tracking-wide">
        © {year} Business Association. All rights reserved.
      </div>
    </footer>
  );
}
