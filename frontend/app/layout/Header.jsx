"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainBtn from "@/utils/MainBtn";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">

      <div className="container mx-auto sm:px-8 border-b border-gray-100 flex items-center justify-between py-2">
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
        
        <h1 className="font-black tracking-tight text-[12px] xs:text-[16px] sm:text-[32px] md:text-[42px] lg:text-[52px] text-[#022147] whitespace-nowrap uppercase text-center flex-grow px-2">
          Real Temple
        </h1>

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
      </div>
      <nav className="relative container mx-auto px-4 sm:px-8 flex items-center justify-between bg-white">

        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-2 items-center">
            {list.map((e, index) => (
              <li key={index}>
                <Link href={e.link} className="px-4 py-2 relative group">
                  <span
                    className={`font-medium transition-colors ${e.isActive
                      ? "text-red-600"
                      : "text-gray-800 hover:text-red-500"
                      }`}
                  >
                    {e.key}
                  </span>

                  {e.isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-red-50 rounded-lg -z-10"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Logo */}
        <MainBtn
          text="Request a Prayer"
          customStyl="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-3"
          onClick={() => router.push("/request-for-prayer")}
        />
        {/* <Link href="/">
          <Image
            src="/logo2.png"
            height={50}
            width={60}
            alt="Logo"
            className="object-contain"
            style={{ width: "auto" }}
            priority
          />
        </Link> */}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Image src="/logo.png" height={40} width={48} alt="Logo" />
                  <button onClick={closeMobileMenu}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <ul className="space-y-2">
                  {list.map((e, index) => (
                    <li key={index}>
                      <Link
                        href={e.link}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-3 rounded-lg ${e.isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {e.key}
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