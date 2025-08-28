"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12 px-6 sm:px-12 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-20">
        {/* 1. 联盟 Logo + 简介 */}
        <div className="flex-1 max-w-xs flex flex-col items-start">
          {/* <h2 className="text-3xl font-extrabold mb-2 tracking-wide">Global Service Union</h2> */}
          <img
            src="/GBAEC logo-footer.svg"
            alt="GBAEC Logo"
            className="w-full max-w-[125px] sm:max-w-[125px] md:max-w-[125px] h-auto object-contain"
          />

          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Uniting Service Businesses Across Borders
          </p>
        </div>

        {/* 2. 菜单 居中，两列布局，移动端改为单列 */}
        <nav className="flex-1 min-w-[280px] grid grid-cols-1 sm:grid-cols-2 gap-10 text-gray-300 text-sm">
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
        </nav>
        {/* 3. 联系方式 */}
        <address
          className="
            flex-1 max-w-sm text-gray-400 text-sm space-y-3 text-right not-italic
            md:-mr-24 lg:-mr-32
          "
        >
          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact Info
          </h3>
          <p className="leading-relaxed">
            123 Global Service Ave.
            <br />
            New York, NY 10001
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
        © {year} Global Service Union. All rights reserved.
      </div>
    </footer>
  );
}
