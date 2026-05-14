"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const contactDetails = [
    {
      icon: <Mail size={20} />,
      title: "Email",
      value: "rgwm.withds@gmail.com",
      href: "mailto:rgwm.withds@gmail.com",
    },

    {
      icon: <Phone size={20} />,
      title: "Phone",
      value: "+91 73999 93536",
      href: "tel:+917399993536",
    },

    {
      icon: <MapPin size={20} />,
      title: "Address",
      value: "REAL TEMPLE, LB Nagar, Hyderabad, India",
      href: "https://maps.google.com",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.8fr_0.8fr_1.6fr]">

          {/* LEFT LOGO SECTION */}
          <div>
            {/* LOGO */}
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="Real Temple Logo"
                width={130}
                height={130}
                className="h-auto w-32 object-contain"
              />
            </Link>

            {/* TEXT */}
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-gray-400">
              Bringing faith, hope, and spiritual guidance through worship,
              prayer, and community.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-8 flex items-center gap-4">
              {[
                {
                  icon: Facebook,
                  bg: "bg-blue-600",
                },

                {
                  icon: Youtube,
                  bg: "bg-red-600",
                },

                {
                  icon: Instagram,
                  bg: "bg-pink-500",
                },

                {
                  icon: MessageCircle,
                  bg: "bg-green-500",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`${item.bg} flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110`}
                  >
                    <Icon size={24} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="border-l border-white/10 pl-8">
            <h2 className="text-[20px] font-bold">
              Quick Links
            </h2>

            {/* UNDERLINE */}
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />

            <div className="mt-7 flex flex-col gap-4 text-[15px] text-gray-400">
              {["Home", "About", "Watch", "Gallery"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* EXPLORE */}
          <div className="border-l border-white/10 pl-8">
            <h2 className="text-[20px] font-bold">
              Explore
            </h2>

            {/* UNDERLINE */}
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />

            <div className="mt-7 flex flex-col gap-4 text-[15px] text-gray-400">
              {[
                "Events",
                "Magazines",
                "Contact",
                "Contribution",
              ].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="border-l border-white/10 pl-8">
            <h2 className="text-[20px] font-bold">
              Contact Us
            </h2>

            {/* UNDERLINE */}
            <div className="mt-2 h-[3px] w-14 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />

            {/* CONTACT CARDS */}
            <div className="mt-5 flex flex-col gap-3">
              {contactDetails.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={
                    item.title === "Address"
                      ? "_blank"
                      : "_self"
                  }
                  rel="noopener noreferrer"
                  className="
          group
          flex
          min-h-[70px]
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          px-4
          backdrop-blur-xl
          transition-all
          duration-500
          hover:border-red-500/40
          hover:bg-white/[0.07]
          hover:shadow-[0_0_20px_rgba(255,0,85,0.12)]
        "
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">

                    {/* ICON */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-500 shadow-lg transition-all duration-300 group-hover:scale-105">
                      {item.icon}
                    </div>

                    {/* TEXT */}
                    <div>
                      <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                        {item.title}
                      </p>

                      <h3 className="mt-[2px] text-[14px] font-medium leading-snug text-white">
                        {item.value}
                      </h3>
                    </div>
                  </div>

                  {/* RIGHT ICON */}
                  <ArrowUpRight className="h-4 w-4 text-pink-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>
          </div>  
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-gray-500 md:flex-row">
            <p className="text-base">
              © 2026 Real Temple. All Rights Reserved.
            </p>

            <div className="flex items-center gap-8">
              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-white"
              >
                Terms
              </Link>

              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-white"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}