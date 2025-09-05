'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/join', label: 'Join Us' },
  { href: '/services', label: 'Services' },
  { href: '/dashboard', label: 'Alliance Center' },
  { href: '/community', label: 'Community' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  // ✅ 控制 body 滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`transition-colors duration-200 ${
                isActive
                  ? 'text-indigo-700 border-b-2 border-indigo-700 pb-[2px]'
                  : 'text-gray-800 hover:text-indigo-700'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={toggleDrawer}
        className="md:hidden flex items-center text-gray-800 hover:text-indigo-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile drawer */}
      <div
  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:hidden`}
>
  <div className="flex items-center justify-between px-4 py-3 border-b">
    <span className="text-lg font-bold">Menu</span>
    <button onClick={closeDrawer}>
      <X size={24} />
    </button>
  </div>
  <nav className="flex flex-col p-4 gap-4 text-base font-medium">
    {links.map(({ href, label }) => {
      const isActive = pathname === href;
      return (
        <Link
          key={href}
          href={href}
          onClick={closeDrawer}
          className={`transition-colors duration-200 ${
            isActive ? 'text-indigo-700 font-semibold' : 'text-gray-800 hover:text-indigo-700'
          }`}
        >
          {label}
        </Link>
      );
    })}
  </nav>
</div>


      {/* 背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={closeDrawer}
        />
      )}
    </>
  );
}
