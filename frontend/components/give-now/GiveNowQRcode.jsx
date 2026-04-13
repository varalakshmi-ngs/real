"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, CreditCard, Landmark } from "lucide-react";

export default function GiveNowQRcode() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="w-full bg-white py-24 px-6 sm:px-12 overflow-hidden border-t border-gray-100">
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* QR & Direct Transfer Section */}
        {/* <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
          
          <motion.div 
            className="flex-1 flex flex-col justify-center text-center lg:text-left gap-6"
            variants={itemVariants}
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Direct <span className="text-red-600">Transfer</span>
            </h2>
            <div className="h-1 bg-red-600 w-24 rounded-full mx-auto lg:mx-0" />
            <p className="text-xl text-gray-600 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
              Scan the QR code to securely and directly transfer your contribution to The Real Temple Foundation.
            </p>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-600/5 transition-colors group-hover:bg-red-600/10" />
              <div className="h-64 w-64 bg-white shadow-inner rounded-2xl flex items-center justify-center border-2 border-dashed border-red-200 relative z-10">
                <span className="text-gray-400 font-medium">QR Code Graphic</span>
              </div>
              <p className="text-gray-500 font-medium tracking-wide uppercase text-sm z-10">Scan with any UPI App</p>
            </div>
          </motion.div>

        </div> */}

        {/* Bank Details Section */}
        <motion.div 
          className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-black/80 z-0" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0" />

          <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-inner shrink-0 rotate-3 transition-transform hover:rotate-0">
                <Building2 size={40} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg text-red-300 font-medium mb-1 tracking-wide uppercase">Bank Transfer</h3>
                <h2 className="text-3xl font-serif font-bold text-white">D. SURESH</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-300/80 mb-1">
                  <CreditCard size={18} />
                  <p className="font-medium text-sm tracking-widest uppercase">Account No</p>
                </div>
                <p className="text-2xl font-mono font-medium text-white tracking-wider">50100286369360</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-300/80 mb-1">
                  <Landmark size={18} />
                  <p className="font-medium text-sm tracking-widest uppercase">IFSC Code</p>
                </div>
                <p className="text-2xl font-mono font-medium text-white tracking-wider">HDFC0001990</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-300/80 mb-1">
                  <Building2 size={18} />
                  <p className="font-medium text-sm tracking-widest uppercase">Branch</p>
                </div>
                <p className="text-xl font-sans font-medium text-white tracking-wide mt-1">HAYATNAGAR</p>
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
