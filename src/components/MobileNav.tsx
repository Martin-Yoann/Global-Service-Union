"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/join', label: 'Join Us' },
  { href: '/donate', label: 'Donate' },
  { href: '/services', label: 'Services' },
  { href: '/dashboard', label: 'Alliance Center' },
  { href: '/community', label: 'Community' },
];

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 w-64 h-full bg-white p-6 shadow transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={clsx(
                  "transition-colors duration-200 font-medium",
                  isActive
                    ? "text-indigo-700 border-l-4 pl-2 border-indigo-700"
                    : "text-gray-800 hover:text-indigo-700"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
