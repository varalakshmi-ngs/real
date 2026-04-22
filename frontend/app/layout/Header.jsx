"use client";
import { Facebook, Menu, X, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainBtn from "@/utils/MainBtn";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M20.5 3.5a9.7 9.7 0 0 0-17.15 7.05c0 1.36.35 2.7 1.02 3.88L3 21l6.64-1.72a9.73 9.73 0 0 0 4.86 1.18h.01c5.37 0 9.73-4.36 9.73-9.73 0-2.6-1.02-5.04-2.86-6.81z" />
      <path d="M16.4 13.17c-.23.65-1.33 1.25-1.67 1.3-.35.05-.76.07-1.16-.09-.4-.16-1.53-.56-2.3-1.44-.53-.61-1-1.2-1.22-1.56-.24-.4-.01-.62.2-.84.18-.2.35-.45.52-.7.17-.24.23-.4.33-.66.1-.27.03-.47-.04-.64-.08-.17-.37-.56-.55-.76-.18-.2-.8-.85-1.1-1.16-.28-.27-.48-.2-.66-.16-.17.05-.36.05-.56.05-.2 0-.53.07-.8.34-.27.26-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.05 3.12 5.03 4.27.7.29 1.28.46 1.72.58.72.2 1.38.17 1.9.1.58-.08 1.82-.75 2.12-1.66.3-.9.3-1.67.2-1.83-.12-.17-.4-.26-.74-.44z" />
      <path d="M15.01 11.53c-.1-.03-.58-.26-.67-.29-.08-.04-.14-.03-.2.03-.06.06-.22.24-.27.29-.05.06-.1.07-.2.03-.1-.04-.41-.15-.78-.47-.29-.25-.48-.55-.53-.61-.06-.07-.01-.1.05-.13.06-.03.13-.07.2-.1.07-.03.1-.06.16-.1.06-.04.08-.07.12-.12.04-.05.03-.11 0-.16-.03-.05-.3-.71-.42-.97-.12-.26-.25-.23-.34-.23h-.12c-.11 0-.29.04-.44.2-.15.16-.56.55-.56 1.34 0 .79.57 1.55.65 1.66.08.1 1.12 1.7 2.7 2.38.38.16.68.26.91.34.38.12.72.1.99.06.3-.05.92-.38 1.05-.75.13-.37.13-.69.09-.75-.04-.06-.14-.1-.29-.16z" />
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
    { key: "Contribution", link: "/contribution", isActive: pathname === "/contribution" },
    { key: "Events", link: "/events", isActive: pathname === "/events" },
    { key: "Watch", link: "/watch", isActive: pathname === "/watch" },
    { key: "Magazines", link: "/magazines", isActive: pathname === "/magazines" },
    { key: "Contact", link: "/contact", isActive: pathname === "/contact" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-visible">
      <div className="relative z-30 w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between py-2">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo2.png"
              height={40}
              width={50}
              alt="Logo"
              className="object-contain sm:h-[50px] sm:w-[60px]"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <h1 className="font-black tracking-tight text-[12px] xs:text-[16px] sm:text-[32px] md:text-[42px] lg:text-[52px] text-[#022147] uppercase text-center flex-grow px-2">
            Real Temple
          </h1>

          <MainBtn
            text="Request a Prayer"
            customStyl="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-3"
            onClick={() => router.push("/request-for-prayer")}
          />
        </div>
      </div>

      <div className={`relative z-20 w-full bg-white border-b border-slate-200 shadow-sm transition-transform duration-300 ease-out ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <nav className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <ul className="hidden lg:flex gap-2 items-center">
                {list.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className={`px-4 py-2 rounded-full transition ${
                        item.isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-800 hover:text-red-500 hover:bg-slate-100"
                      }`}
                    >
                      {item.key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition duration-200 hover:-translate-y-1 hover:bg-[#145dbf]"
                title="Facebook"
              >
                <Facebook className="h-5 w-5 transition duration-200 group-hover:scale-110" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition duration-200 hover:-translate-y-1 hover:bg-slate-900"
                title="X"
              >
                <X className="h-5 w-5 transition duration-200 group-hover:scale-110" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white transition duration-200 hover:-translate-y-1 hover:bg-[#e10000]"
                title="YouTube"
              >
                <Youtube className="h-5 w-5 transition duration-200 group-hover:scale-110" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition duration-200 hover:-translate-y-1 hover:bg-[#1aba4b]"
                title="WhatsApp"
              >
                <WhatsappIcon />
              </a>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed left-0 top-0 z-50 h-full w-[280px] overflow-hidden bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-2xl bg-red-600">
                    <Image src="/logo2.png" alt="Logo" fill className="object-contain" priority />
                  </div>
                  <div>
                    {/* <p className="text-sm font-semibold text-slate-900">Real Temple</p> */}
                    <p className="text-xs text-slate-500">Navigation</p>
                  </div>
                </div>
                <button onClick={closeMobileMenu} className="rounded-xl p-2 text-slate-700 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {list.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        onClick={closeMobileMenu}
                        className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
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
