"use client";

import { Facebook, Menu, X, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M20.5 3.5a9.7 9.7 0 0 0-17.15 7.05c0 1.36.35 2.7 1.02 3.88L3 21l6.64-1.72a9.73 9.73 0 0 0 4.86 1.18h.01c5.37 0 9.73-4.36 9.73-9.73 0-2.6-1.02-5.04-2.86-6.81z" />
      <path d="M16.4 13.17c-.23.65-1.33 1.25-1.67 1.3-.35.05-.76.07-1.16-.09-.4-.16-1.53-.56-2.3-1.44-.53-.61-1-1.2-1.22-1.56-.24-.4-.01-.62.2-.84.18-.2.35-.45.52-.7.17-.24.23-.4.33-.66.1-.27.03-.47-.04-.64-.08-.17-.37-.56-.55-.76-.18-.2-.8-.85-1.1-1.16-.28-.27-.48-.2-.66-.16-.17.05-.36.05-.56.05-.2 0-.53.07-.8.34-.27.26-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.05 3.12 5.03 4.27.7.29 1.28.46 1.72.58.72.2 1.38.17 1.9.1.58-.08 1.82-.75 2.12-1.66.3-.9.3-1.67.2-1.83-.12-.17-.4-.26-.74-.44z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const lastScrollY = useRef(0);

  const list = [
    { key: "Home", link: "/", isActive: pathname === "/" },
    { key: "About", link: "/about", isActive: pathname === "/about" },
    { key: "Gallery", link: "/gallery", isActive: pathname === "/gallery" },
    {
      key: "Contribution",
      link: "/contribution",
      isActive: pathname === "/contribution",
    },
    { key: "Events", link: "/events", isActive: pathname === "/events" },
    { key: "Watch", link: "/watch", isActive: pathname === "/watch" },
    {
      key: "Magazines",
      link: "/magazines",
      isActive: pathname === "/magazines",
    },
    { key: "Contact", link: "/contact", isActive: pathname === "/contact" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > 80
      ) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-visible">
      {/* TOP HEADER */}
      <div className="relative z-30 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-1 sm:px-6">
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
  <Image
    src="/logo2.png"
    alt="Logo"
    width={120}
    height={120}
    priority
    className="h-[45px] w-auto sm:h-[70px]"
  />
</Link>

          {/* TITLE */}
<h1 className="flex-grow px-2 text-center text-[18px] font-extrabold uppercase tracking-wide text-[#022147] xs:text-[24px] sm:text-[34px] md:text-[44px] lg:text-[56px]">
              Real Temple
          </h1>

          {/* BUTTON */}
          {/* BUTTON */}
<motion.button
  whileHover={{
    scale: 1.05,
    y: -2,
  }}
  whileTap={{ scale: 0.96 }}
  onClick={() => router.push("/request-for-prayer")}
  className="frutiger-button hidden sm:block"
>
  <div className="inner">
    <div className="top-white"></div>

    <span className="text">
      Request a Prayer
    </span>
  </div>
</motion.button>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className={`relative z-20 w-full border-b border-slate-200 bg-white shadow-sm transition-transform duration-300 ease-out ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-2 sm:px-6">
          <nav className="flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* MOBILE MENU BTN */}
              <button
                className="rounded-md p-2 text-gray-800 hover:bg-gray-100 lg:hidden"
                onClick={toggleMobileMenu}
                aria-label={
                  isMobileMenuOpen
                    ? "Close menu"
                    : "Open menu"
                }
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* DESKTOP NAV */}
<ul className="hidden items-center gap-3 lg:flex">
  {list.map((item, index) => (
    <li key={index}>
      <Link
        href={item.link}
        className={`rounded-full px-4 py-2 text-[17px] font-medium transition-all duration-300 ${
          item.isActive
            ? "bg-red-50 text-red-600 shadow-sm"
            : "text-gray-800 hover:bg-slate-100 hover:text-red-500"
        }`}
      >
        {item.key}
      </Link>
    </li>
  ))}
</ul>
            </div>

            {/* SOCIAL ICONS */}
            <div className="hidden items-center gap-2 lg:flex">
              {/* FACEBOOK */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition duration-200 hover:-translate-y-1 hover:bg-[#145dbf]"
              >
                <Facebook className="h-4 w-4 transition duration-200 group-hover:scale-110" />
              </a>

              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                title="X"
                className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition duration-200 hover:-translate-y-1 hover:bg-slate-900"
              >
                <X className="h-4 w-4 transition duration-200 group-hover:scale-110" />
              </a>

              {/* YOUTUBE */}
              <a
                href="https://www.youtube.com/@REALTEMPLE"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white transition duration-200 hover:-translate-y-1 hover:bg-[#e10000]"
              >
                <Youtube className="h-4 w-4 transition duration-200 group-hover:scale-110" />
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white transition duration-200 hover:-translate-y-1 hover:bg-[#1aba4b]"
              >
                <WhatsappIcon />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              className="fixed left-0 top-0 z-50 h-full w-[260px] overflow-hidden bg-white shadow-2xl lg:hidden"
            >
              {/* TOP */}
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-1xl bg-white-600">
                    <Image
                      src="/logo2.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    Navigation
                  </p>
                </div>

                <button
                  onClick={closeMobileMenu}
                  className="rounded-xl p-2 text-slate-700 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* LINKS */}
              <div className="p-4">
                <ul className="space-y-2">
                  {list.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        onClick={closeMobileMenu}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                          item.isActive
                            ? "bg-red-50 text-red-600"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {item.key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}