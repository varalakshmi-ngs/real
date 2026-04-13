"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M20.5 3.5a9.7 9.7 0 0 0-17.15 7.05c0 1.36.35 2.7 1.02 3.88L3 21l6.64-1.72a9.73 9.73 0 0 0 4.86 1.18h.01c5.37 0 9.73-4.36 9.73-9.73 0-2.6-1.02-5.04-2.86-6.81z" />
      <path d="M16.4 13.17c-.23.65-1.33 1.25-1.67 1.3-.35.05-.76.07-1.16-.09-.4-.16-1.53-.56-2.3-1.44-.53-.61-1-1.2-1.22-1.56-.24-.4-.01-.62.2-.84.18-.2.35-.45.52-.7.17-.24.23-.4.33-.66.1-.27.03-.47-.04-.64-.08-.17-.37-.56-.55-.76-.18-.2-.8-.85-1.1-1.16-.28-.27-.48-.2-.66-.16-.17.05-.36.05-.56.05-.2 0-.53.07-.8.34-.27.26-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.05 3.12 5.03 4.27.7.29 1.28.46 1.72.58.72.2 1.38.17 1.9.1.58-.08 1.82-.75 2.12-1.66.3-.9.3-1.67.2-1.83-.12-.17-.4-.26-.74-.44z" />
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
    { key: "Contribution", link: "/contribution" }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, link: "https://facebook.com", title: "Facebook", color: "#1877F2" },
    { icon: <Youtube className="w-5 h-5" />, link: "https://youtube.com", title: "YouTube", color: "#FF0000" },
    { icon: <Instagram className="w-5 h-5" />, link: "https://instagram.com", title: "Instagram", color: "#E4405F" },
    { icon: <WhatsappIcon />, link: "https://wa.me/917399993536", title: "WhatsApp", color: "#25D366" }
  ];

  const contactDetails = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      title: "E-mail", 
      value: "rgwm.withds@gmail.com", 
      href: "mailto:rgwm.withds@gmail.com" 
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      title: "Phone", 
      value: "+91 73999 93536", 
      href: "tel:+917399993536" 
    },
    { 
      icon: <MapPin className="w-5 h-5" />, 
      title: "Address", 
      value: "REAL TEMPLE, LB Nagar, Hyderabad, India", 
      href: "https://www.google.com/maps/search/?api=1&query=LB+Nagar+Hyderabad" 
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#2b2b2b] to-[#111111] text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-main opacity-5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-900 opacity-5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Brand Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <Link href="/" className="inline-block">
              <Image src="/footerlogo.png" height={100} width={100} className="w-20 h-auto filter brightness-0 invert" alt="Logo" />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs text-justify">
              Bringing hope, faith, and community together. Dedicated to spreading the message of love and building a spiritual home for everyone.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ '--hover-color': social.color }}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-[var(--hover-color)] transition-colors duration-300"
                  title={social.title}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-main rounded-full" />
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {navLinks.slice(0, 4).map((link, idx) => (
                <li key={idx}>
                  <Link href={link.link} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block text-sm">
                    {link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Explore */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-main rounded-full" />
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {navLinks.slice(4).map((link, idx) => (
                <li key={idx}>
                  <Link href={link.link} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block text-sm">
                    {link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-main rounded-full" />
            </h3>
            <div className="flex flex-col gap-4">
              {contactDetails.map((contact, idx) => (
                <motion.a
                  key={idx}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                >
                  <div className="p-2.5 bg-main/20 rounded-lg text-main group-hover:bg-main group-hover:text-white transition-colors">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">{contact.title}</p>
                    <p className="text-sm font-medium leading-snug">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {new Date().getFullYear()} Real Temple. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
          <p className="text-xs text-gray-600">Established for the glory of His name 🙏</p>
        </div>
      </div>
    </footer>
  );
}
