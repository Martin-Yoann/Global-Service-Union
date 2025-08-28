"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import NavLinks from "../components/NavLinks";
import AuthModal from "./AuthModal";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useLanguage } from "../context/LanguageContext";
import { FiSearch } from "react-icons/fi"; // 搜索图标

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useUser();
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 统一按钮样式
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
      {/* Logo & Navigation */}
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
        <NavLinks language={language} />
      </div>

   {/* Right Action Buttons */}
<div className="flex items-center gap-5 "> 
  {/* Donate 按钮（蓝底） */}
  <Link
    href="/donate"
    className="w-28 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-center"
  >
    {language === "en" ? "Donate" : "捐赠"}
  </Link>

  {/* Search 按钮（白底） */}
  <button
  onClick={() => setShowSearch(!showSearch)}
  className="w-28 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center gap-2"
  aria-label="Search"
>
  {/* SVG 图标 */}
  <svg
    t="1756283957963"
    className="icon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#838383"
  >
    <path d="M1013.9 975.4L747.3 708.8c66.3-75.3 106.9-173.7 106.9-281.7C854.2 191.6 662.6 0 427.1 0S0 191.6 0 427.1s191.6 427.1 427.1 427.1c107.1 0 204.8-39.9 279.9-105.2l266.6 266.6c5.6 5.6 12.8 8.3 20.1 8.3s14.6-2.8 20.1-8.3c11.2-11.1 11.2-29.1 0.1-40.2z m-957-548.3C56.9 223 223 56.9 427.1 56.9S797.3 223 797.3 427.1 631.2 797.3 427.1 797.3 56.9 631.2 56.9 427.1z"></path>
  </svg>

  {/* 按钮文字 */}
  {language === "en" ? "Search" : "搜索"}
</button>


  {/* 搜索框 */}
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
  <SignedOut>
  <button
  onClick={() => setShowLogin(true)}
  className="w-28 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center gap-2"
>
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
  >
    <path
      d="M515.541449 7.082899c-280.359429 0-508.458551 228.120391-508.458551 508.458551s228.120391 508.458551 508.458551 508.458551 508.458551-228.120391 508.458551-508.458551S795.900879 7.082899 515.541449 7.082899zM515.541449 981.864196c-257.132626 0-466.301477-209.190121-466.301477-466.322747 0-257.132626 209.168851-466.322747 466.301477-466.322747s466.301477 209.190121 466.301477 466.322747S772.674075 981.864196 515.541449 981.864196zM614.574414 524.177056 614.574414 524.177056c47.751075-31.96876 79.230625-86.398604 79.230625-148.187857 0-98.437405-79.804915-178.24232-178.24232-178.24232-98.437405 0-178.24232 79.804915-178.24232 178.24232 0 61.810523 31.479551 116.219097 79.251895 148.187857-100.266622 39.519598-171.244501 137.170014-171.244501 251.453545 0 0.23397 0 0.446669 0.02127 0.659369 0 0.04254-0.02127 0.10635-0.02127 0.14889 0 15.612155 12.65563 28.246516 28.267786 28.246516 15.590885 0 21.886796-12.63436 21.886796-28.246516 0-0.340319-0.08508-0.659369-0.10635-1.020958 0.10635-118.005774 102.159649-219.995264 220.207964-219.995264 118.112124 0 220.207964 102.095839 220.207964 220.207964 0 0.14889-1.467628 29.054774 21.971875 29.054774 15.505806 0 28.076356-12.57055 28.076356-28.055086 0-0.06381-0.02127-0.12762-0.02127-0.2127 0-0.25524 0.02127-0.510479 0.02127-0.786989C785.797645 661.34707 714.798496 563.696654 614.574414 524.177056zM515.541449 510.734437c-74.402343 0-134.723968-60.321625-134.723968-134.723968 0-74.423613 60.321625-134.723968 134.723968-134.723968 74.423613 0 134.723968 60.321625 134.723968 134.723968S589.943792 510.734437 515.541449 510.734437z"
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
</div>


    </header>
  );
}
