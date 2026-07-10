"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "@/Core/rl";

const SocialContext = createContext({
  youtube: "https://www.youtube.com/@REALTEMPLE",
  whatsapp: "https://wa.me/917399993536",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  twitter: "https://x.com",
  linkedin: "",
  email: "rgwm.withds@gmail.com",
  phone: "+91 73999 93536",
  address: "REAL TEMPLE, LB Nagar, Hyderabad, India",
  mapLocation: "Real Temple Church (The Real Church)",
});

export const SocialProvider = ({ children }) => {
  const [socialLinks, setSocialLinks] = useState({
    youtube: "https://www.youtube.com/@REALTEMPLE",
    whatsapp: "https://wa.me/917399993536",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    linkedin: "",
    email: "rgwm.withds@gmail.com",
    phone: "+91 73999 93536",
    address: "REAL TEMPLE, LB Nagar, Hyderabad, India",
    mapLocation: "Real Temple Church (The Real Church)",
  });

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await API.get("/social");
        if (res.data) {
          setSocialLinks({
            youtube: res.data.youtube || "",
            whatsapp: res.data.whatsapp || "",
            facebook: res.data.facebook || "",
            instagram: res.data.instagram || "",
            twitter: res.data.twitter || "",
            linkedin: res.data.linkedin || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            mapLocation: res.data.mapLocation || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch dynamic social links:", err);
      }
    };
    fetchSocials();
  }, []);

  return (
    <SocialContext.Provider value={socialLinks}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocialLinks = () => {
  return useContext(SocialContext);
};
