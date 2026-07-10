"use client";

import GiveNowHeader from "@/components/give-now/GiveNowHeader";
import GiveNowSupport from "@/components/give-now/GiveNowSupport";
import GiveNowWaysToGive from "@/components/give-now/GiveNowWaysToGive";
import GiveNowQRcode from "@/components/give-now/GiveNowQRcode";
import { useContributionData } from "@/Hooks/ContributionHook";
import React from "react";

const defaultData = {
  heroHeadingLine1: "Every contribution matters,",
  heroHeadingHighlight: "every act of giving transforms lives.",
  heroDescription: "Your generosity helps provide vital support, extend outreach efforts, and share the message of Christ with those who need it most.",
  heroButtonGiveNow: "Give Now",
  heroButtonLearnMore: "Learn More",
  
  servingHeading: "Serving with Love",
  servingDescription: "Together we can bring hope, compassion, and support to communities in need.",
  servingImage: "/images/give-now-header.png",
  
  supportImage: "/images/give-now-support.png",
  
  waysLabel: "Support With Love",
  waysHeading: "Ways to Give",
  
  formImage: "/images/GiveNowWaysToGive.png",
  formLabel: "Real Temple Church",
  formHeading: "Every Gift Changes Lives",
  formDescription: "Your generosity empowers missions, supports outreach, and brings hope to families around the world.",
  
  bankAccountName: "D. SURESH",
  bankAccountNumber: "50100286369360",
  bankIfsc: "HDFC0001990",
  bankBranch: "HAYATNAGAR",

  supportItems: [
    {
      title: "Community Outreach",
      description: "At Real Temple Church, every gift has purpose. Your faithful giving enables us to carry the light of Christ far and wide—touching lives, restoring hope, and building the Kingdom of God.",
      icon: "/images/bible-icon.png",
    },
    {
      title: "Global Missions",
      description: "Support our missionaries as they build schools, dig wells, and share the Gospel across 12 nations. Every mission trip changes lives—both for those who go and those who receive.",
      icon: "/images/bible-icon.png",
    },
    {
      title: "Church Growth",
      description: "Your support allows us to expand our ministries, maintain church facilities, and create life-changing worship experiences. You are helping others grow deeper in faith.",
      icon: "/images/bible-icon.png",
    },
  ],
  donationAmounts: [
    { amount: 50 },
    { amount: 100 },
    { amount: 200 },
    { amount: 500 },
    { amount: 2000 },
  ],
  donationPurposes: [
    { name: "Community Outreach", value: "community-outreach" },
    { name: "Global Missions", value: "global-missions" },
    { name: "Church Growth", value: "church-growth" },
  ]
};

const Page = () => {
  const { data, loading, error } = useContributionData();

  // Merge loaded data with defaults to avoid empty states or blank screens during loading/error
  const pageData = {
    ...defaultData,
    ...data,
    supportItems: data?.supportItems?.length ? data.supportItems : defaultData.supportItems,
    donationAmounts: data?.donationAmounts?.length ? data.donationAmounts : defaultData.donationAmounts,
    donationPurposes: data?.donationPurposes?.length ? data.donationPurposes : defaultData.donationPurposes,
  };

  return (
    <div className="w-full">
      <GiveNowHeader data={pageData} />
      <GiveNowSupport data={pageData} />
      <GiveNowWaysToGive data={pageData} />
      <GiveNowQRcode data={pageData} />
    </div>
  );
};

export default Page;
