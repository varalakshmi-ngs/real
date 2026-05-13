"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

import { motion } from "framer-motion";

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M20.5 3.5a9.7 9.7 0 0 0-17.15 7.05c0 1.36.35 2.7 1.02 3.88L3 21l6.64-1.72a9.73 9.73 0 0 0 4.86 1.18h.01c5.37 0 9.73-4.36 9.73-9.73 0-2.6-1.02-5.04-2.86-6.81z" />
    </svg>
  );
}

export default function Footer() {
  const navLinks = [
    { key: "Home", link: "/" },
    { key: "About", link: "/about" },
    { key: "Watch", link: "/watch" },
    { key: "Gallery", link: "/gallery" },
    { key: "Events", link: "/events" },
    { key: "Magazines", link: "/magazines" },
    { key: "Contact", link: "/contact" },
    { key: "Contribution", link: "/contribution" },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      link: "https://facebook.com",
      color: "#1877F2",
    },

    {
      icon: <Youtube className="h-5 w-5" />,
      link: "https://www.youtube.com/@REALTEMPLE",
      color: "#FF0000",
    },

    {
      icon: <Instagram className="h-5 w-5" />,
      link: "https://instagram.com",
      color: "#E4405F",
    },

    {
      icon: <WhatsappIcon />,
      link: "https://wa.me/917399993536",
      color: "#25D366",
    },
  ];

  const contactDetails = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "rgwm.withds@gmail.com",
      href: "mailto:rgwm.withds@gmail.com",
    },

    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+91 73999 93536",
      href: "tel:+917399993536",
    },

    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      value: "REAL TEMPLE, LB Nagar, Hyderabad, India",
      href: "https://maps.google.com",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0f0f11] text-white">
      {/* GLOW EFFECTS */}
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-red-600/10 blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-red-500/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6 py-5 lg:px-12">
        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/">
              <Image
                src="/logo2.png"
                width={90}
                height={90}
                alt="Logo"
                className="h-auto w-20"
              />
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Bringing faith, hope, and spiritual guidance
              through worship, prayer, and community.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -6,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: social.color,
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {navLinks.slice(0, 4).map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 8 }}
                >
                  <Link
                    href={link.link}
                    className="text-gray-400 transition hover:text-red-400"
                  >
                    {link.key}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* EXPLORE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-xl font-bold">
              Explore
            </h3>

            <ul className="space-y-4">
              {navLinks.slice(4).map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 8 }}
                >
                  <Link
                    href={link.link}
                    className="text-gray-400 transition hover:text-red-400"
                  >
                    {link.key}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          {/* CONTACT */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.3 }}
  viewport={{ once: true }}
>
  <h3 className="mb-6 text-xl font-bold">
    Contact Us
  </h3>

  <div className="space-y-4">
    {contactDetails.map((item, idx) => (
      <motion.a
        key={idx}
        href={item.href}
        target="_blank"
        whileHover={{
          x: 6,
        }}
        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10"
      >
        {/* ICON */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg transition group-hover:scale-110">
          {item.icon}
        </div>

        {/* TEXT */}
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-widest text-gray-500">
            {item.title}
          </p>

          <p className="mt-1 text-sm font-medium leading-snug text-white">
            {item.value}
          </p>
        </div>
      </motion.a>
    ))}
  </div>
</motion.div>
        </div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row"
        >
          <p>
            © {new Date().getFullYear()} Real Temple. All
            Rights Reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}