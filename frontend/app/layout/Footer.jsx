"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navLinks = [
    {
      key: "Home",
      link: "/",
    },
    {
      key: "About",
      link: "/about",
    },
    {
      key: "Gallery",
      link: "/gallery",
    },
    {
      key: "Events",
      link: "/events",
    },
    {
      key: "Magazines",
      link: "/magazines",
    },
    {
      key: "Contact",
      link: "/contact",
    },
  ];

  return (
    <footer className="bg-second text-white font-sans mt-4">
      <div className="flex flex-col gap-12 p-6 md:gap-16 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Logo & Social */}
          <div className="flex flex-col gap-4">
            <Image
              src={"/footerlogo.png"}
              height={100}
              width={100}
              className="w-[80px] h-14"
              alt="Logo"
            />
            <p>Bringing hope, faith, and community together since 1985.</p>
          </div>

          <div className="grid  gap-6  md:grid-cols-3 grid-cols-2 md:gap-8">
            <ul className="flex flex-col gap-3">
              {navLinks?.slice(0, 3).map((e, index) => (
                <li key={index}>
                  <Link href={e.link} className="hover:underline">
                    {e.key}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {navLinks?.slice(3).map((e, index) => (
                <li key={index}>
                  <Link href={e.link} className="hover:underline">
                    {e.key}
                  </Link>
                </li>
              ))}
            </ul>


            <div className="flex flex-col gap-5">
              <p className="text-lg font-semibold">Contact Us</p>

              {/* Email */}
              <a
                href="mailto:rgwm.withds@gmail.com"
                className="flex items-start gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition duration-300"
              >
                <Mail className="w-5 h-5 mt-1 text-main" />
                <div>
                  <p className="text-xs text-gray-300">E-mail</p>
                  <p className="text-sm font-medium">rgwm.withds@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+917399993536"
                className="flex items-start gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition duration-300"
              >
                <Phone className="w-5 h-5 mt-1 text-main" />
                <div>
                  <p className="text-xs text-gray-300">Phone</p>
                  <p className="text-sm font-medium">+91 73999 93536</p>
                </div>
              </a>

              {/* Address (Optional: Open Google Maps) */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=LB+Nagar+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition duration-300"
              >
                <MapPin className="w-5 h-5 mt-1 text-main" />
                <div>
                  <p className="text-xs text-gray-300">Address</p>
                  <p className="text-sm font-medium leading-snug">
                    REAL TEMPLE, LB Nagar,<br />
                    Hyderabad, India
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center md:text-start flex flex-col md:items-start items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm md:flex-row w-full">
          <p>© Copyright 2022, All Rights Reserved</p>
          <div className="flex flex-wrap gap-4">

            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
