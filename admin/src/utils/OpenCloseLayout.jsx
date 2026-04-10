import React from "react";
import SectionTitle from "./SectionTitle";

export default function OpenCloseLayout({ children, title = "Hero Section" }) {
  return (
    <div className="border w-full border-slate-200 bg-white text-slate-900 p-4 rounded-2xl space-y-4 shadow-sm">
      <SectionTitle title={title} />

      {children}
    </div>
  );
}
