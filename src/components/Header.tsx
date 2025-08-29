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
const UserButton = dynamic(() => import("@clerk/nextjs").then((m) => m.UserButton), {
  ssr: false,
});

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useUser();
  const { language } = useLanguage();

  // 控制“挂载”状态，确保 SignedIn/SignedOut 不在 SSR 时渲染
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonClass =
    "px-4 py-2 w-28 text-center rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium";

  return (
    <header
      className={clsx(
        "w-full py-3 flex items-center justify-between px-6 md:pl-20 transition-all duration-300 z-50",
        isSticky
          ? "fixed top-0 left-0 bg-white/90 shadow backdrop-blur-sm"
          : "relative bg-transparent"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="block">
          <span className="sr-only">Global Service Union</span>
          <img
            src="/GBAEC logo_header.svg"
            alt="Global Service Union Logo"
            className="w-32 h-auto"
            width={192}
            height={48}
          />
        </Link>
        <NavLinks />
      </div>
      

      {/* Right Action Buttons */}
      <div className="flex items-center gap-5">
        {/* Donate 按钮 */}
        <Link
          href="/donate"
          className="w-28 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-center"
        >
          {language === "en" ? "Donate" : "捐赠"}
        </Link>

        {/* Search 按钮 */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="w-28 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center gap-2"
          aria-label="Search"
        >
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#838383"
          >
            <path d="M1013.9 975.4L747.3 708.8c66.3-75.3 106.9-173.7 106.9-281.7C854.2 191.6 662.6 0 427.1 0S0 191.6 0 427.1s191.6 427.1 427.1 427.1c107.1 0 204.8-39.9 279.9-105.2l266.6 266.6c5.6 5.6 12.8 8.3 20.1 8.3s14.6-2.8 20.1-8.3c11.2-11.1 11.2-29.1 0.1-40.2z m-957-548.3C56.9 223 223 56.9 427.1 56.9S797.3 223 797.3 427.1 631.2 797.3 427.1 797.3 56.9 631.2 56.9 427.1z"></path>
          </svg>
          {language === "en" ? "Search" : "搜索"}
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
                className="w-28 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center gap-2"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                >
                  <path
                    d="M515.5 7.1c-280.4 0-508.5 228.1-508.5 508.5s228.1 508.5 508.5 508.5 508.5-228.1 508.5-508.5S795.9 7.1 515.5 7.1zm0 974.8c-257.1 0-466.3-209.2-466.3-466.3S258.4 49.3 515.5 49.3s466.3 209.2 466.3 466.3-209.2 466.3-466.3 466.3z"
                    fill="#272636"
                  />
                </svg>
                {language === "en" ? "Login" : "登录"}
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
