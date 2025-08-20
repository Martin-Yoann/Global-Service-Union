"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import NavLinks from "../components/NavLinks";
import AuthModal from "./AuthModal";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useUser();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonClass =
    "px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium";

  return (
    <header
      className={clsx(
        "w-full py-3 flex items-center justify-between px-6 md:px-10 transition-all duration-300 z-50",
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
            src="/logo.svg"
            alt="Global Service Union Logo"
            className="w-32 h-auto"
            width={192}
            height={48}
          />
        </Link>
        <NavLinks language={language} />
      </div>

      {/* Auth & Language Area */}
      <div className="flex items-center gap-3">
        {/* Language Switch */}
        <button onClick={toggleLanguage} className={buttonClass}>
          {language === "en" ? "中文" : "English"}
        </button>

        {/* Login Button (when signed out) */}
        <SignedOut>
          <button
            onClick={() => setShowLogin(true)}
            className={buttonClass}
          >
            {language === "en" ? "Login" : "登录"}
          </button>
          <AuthModal open={showLogin} onClose={() => setShowLogin(false)} />
        </SignedOut>

        {/* User Avatar (when signed in) */}
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
