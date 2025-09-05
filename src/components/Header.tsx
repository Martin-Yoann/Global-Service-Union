"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import NavLinks from "../components/NavLinks";
import AuthModal from "./AuthModal";
import dynamic from "next/dynamic";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { useLanguage } from "../context/LanguageContext";

// ✅ 动态加载 UserButton，只在客户端渲染
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.UserButton),
  {
    ssr: false,
  }
);

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useUser();
  const { language } = useLanguage();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "w-full py-3 flex items-center justify-between px-6 md:pl-20 transition-all duration-300 z-50",
        isSticky
          ? "fixed top-0 left-0 bg-white/90 shadow backdrop-blur-sm"
          : "relative bg-transparent"
      )}
    >
      {/* Logo + Nav */}
      <div className="flex items-center justify-between w-full md:w-auto gap-6">
        {/* 移动端 NavLinks 按钮 (最左边) */}
        <div className="flex md:hidden order-1">
          <NavLinks />
        </div>

        {/* Logo */}
        <div className="flex justify-center md:justify-start flex-1 md:flex-none order-2">
          <Link href="/" className="block">
            <span className="sr-only">Global Service Union</span>
            <img
              src="/logo_header.svg"
              alt="Global Service Union Logo"
              className="w-32 h-auto"
              width={192}
              height={48}
            />
          </Link>
        </div>

        {/* 桌面端 NavLinks (Logo 右边) */}
        <div className="hidden md:flex order-3">
          <NavLinks />
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Donate 按钮 */}
        <Link
          href="/donate"
          className="flex items-center justify-center md:w-28 w-10 h-10 md:h-auto px-0 md:px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium"
        >
          <svg
            viewBox="0 0 1195 1024"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M632.573 841.338c-8.469 0-16.892-3.218-23.34-9.668l-306.9-306.882c-12.898-12.892-12.898-33.783 0-46.681 12.892-12.892 33.783-12.892 46.68 0l306.9 306.882c12.892 12.875 12.892 33.806 0 46.681-6.449 6.449-14.918 9.668-23.34 9.668M597.837 977.035c-8.464 0-16.892-3.225-23.334-9.668l-414.531-414.506c-51.753-51.753-77.972-117.817-77.972-196.415 0-75.523 26.993-140.835 80.29-194.155 53.303-53.278 118.633-80.29 194.155-80.29 78.592 0 144.68 26.237 196.408 77.972l45.739 48.761 48.761-48.761c51.753-51.735 117.84-77.972 196.415-77.972 75.54 0 140.876 27.012 194.173 80.29 53.278 53.32 80.29 118.633 80.29 194.155 0 75.54-27.769 141.628-82.525 196.415l-100.788 100.77c-12.898 12.898-33.788 12.898-46.681 0-12.904-12.874-12.904-33.806 0-46.68l100.793-100.77c42.508-42.538 63.178-91.513 63.178-149.734 0-58.178-19.937-106.45-60.967-147.475-41.031-41.025-89.261-60.95-147.475-60.95-61.278 0-110.277 19.187-149.728 58.649l-72.864 72.859c-6.318 6.318-14.608 9.262-23.895 9.668-8.917-0.149-17.41-3.91-23.537-10.442l-68.322-72.858c-38.707-38.688-87.682-57.875-148.983-57.875-58.196 0-106.42 19.925-147.469 60.95-41.006 41.048-60.955 89.297-60.955 147.475 0 61.295 19.174 110.272 58.631 149.734l414.531 414.506c12.898 12.875 12.898 33.783 0 46.681-6.443 6.443-14.913 9.668-23.34 9.668z"
              fill="#fff"
            />
          </svg>
          <span className="hidden md:inline ml-2">
            {language === "en" ? "Donate" : "捐赠"}
          </span>
        </Link>

        {/* Search 按钮 */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center justify-center md:w-28 w-10 h-10 md:h-auto px-0 md:px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm cursor-pointer gap-2"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M953.5 908.2 800.9 745c61.9-74.5 95.8-167.4 95.8-265.1 0-229.3-186.6-415.9-416.1-415.9S64.7 250.6 64.7 479.9s186.6 415.9 415.9 415.9c60 0 118-12.6 172.2-37.3 16.2-7.4 23.2-26.3 15.8-42.3-7.4-16.2-26.3-23.2-42.3-15.8-45.9 20.8-94.9 31.5-145.7 31.5-194 0-351.9-157.9-351.9-351.9 0-194 157.9-351.9 351.9-351.9s351.9 157.9 351.9 351.9c0 91.3-34.9 177.9-98 243.7-12.2 12.7-11.9 33 0.9 45.2l165.5 177c6.2 6.7 14.8 10.1 23.4 10.1 7.9 0 15.7-2.9 21.8-8.6 12.4-12.6 13.1-32.9 1-46z"
              fill="#575B66"
            ></path>
          </svg>
          <span className="hidden md:inline">
            {language === "en" ? "Search" : "搜索"}
          </span>
        </button>

        {showSearch && (
          <div className="absolute top-full right-[50px] mt-2 bg-white shadow-lg rounded-md p-3 w-64 border">
            <input
              type="text"
              placeholder={language === "en" ? "Search..." : "搜索..."}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* 登录按钮 / 用户头像 */}
        {mounted && (
          <>
            <SignedOut>
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center justify-center md:w-28 w-10 h-10 md:h-auto px-0 md:px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm cursor-pointer gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M512 120c14.5 0 29.3 1.6 43.9 4.6 78.4 16.4 141.7 84 153.7 164.2 12.3 82-24.4 159.5-95.8 202.2-18.1 10.8-28.6 30.9-27.2 52 1.5 21.1 14.6 39.5 34.1 47.7 115.8 48.9 198.6 169 215.5 313.3H187.3c17.4-144.3 100.1-264.4 215.9-313.3 19.4-8.2 32.6-26.7 34.1-47.7 1.5-21.1-9-41.1-27.2-52-61.4-36.7-98.1-100.6-98.1-171 0-110.3 89.7-200 200-200m0-56c-141.4 0-256 114.6-256 256 0 93.5 50.6 174.4 125.5 219.1C250 594.7 151.7 731.2 131.7 897.3c-4 33.3 22.5 62.7 56 62.7h648.5c33.5 0 60-29.4 56-62.7-20-166.1-118.2-302.7-249.7-358.2 85.2-50.9 139-148.7 122.5-258.6-15.5-103.1-95.5-189.3-197.6-210.7-18.8-3.9-37.3-5.8-55.4-5.8z"
                    fill="#272636"
                  ></path>
                </svg>
                <span className="hidden md:inline">
                  {language === "en" ? "Login" : "登录"}
                </span>
              </button>

              <AuthModal open={showLogin} onClose={() => setShowLogin(false)} />
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </>
        )}
      </div>
    </header>
  );
}
