import JesusFooterImage from "@/components/about/JesusFooterImage";
import GiveNowHeader from "@/components/give-now/GiveNowHeader";

import GiveNowQRcode from "@/components/give-now/GiveNowQRcode";
import GiveNowSupport from "@/components/give-now/GiveNowSupport";
import { GiveNowWaysToGive } from "@/components/give-now/GiveNowWaysToGive";

import React from "react";
const page = () => {
  return (
    <div className="w-full">
      <GiveNowHeader />
      <GiveNowSupport />
      <GiveNowWaysToGive />
      <GiveNowQRcode />
      {/* <JesusFooterImage /> */}
    </div>
  );
};

export default page;
