"use client";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const AddressCard = () => {
  return (
    <section className="w-full bg-white py-16 px-6 sm:px-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
          
          {/* Contact Information Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
             <motion.div 
               className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:shadow-lg hover:border-red-100 transition-all group"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
             >
                <div className="bg-white p-4 rounded-2xl shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <MapPin size={32} />
                </div>
                <div>
                   <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">Our Location</h3>
                   <p className="text-gray-600 font-sans">123 Faith Avenue,<br />Spiritual City, SC 12345</p>
                </div>
             </motion.div>

             <motion.div 
               className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:shadow-lg hover:border-red-100 transition-all group"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
             >
                <div className="bg-white p-4 rounded-2xl shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Mail size={32} />
                </div>
                <div>
                   <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">Email Us</h3>
                   <a href="mailto:info@realtemple.com" className="text-gray-600 font-sans hover:text-red-600 transition-colors">info@realtemple.com</a>
                   <p className="text-gray-500 text-sm mt-1 font-sans">We reply within 24 hrs</p>
                </div>
             </motion.div>

             <motion.div 
               className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:shadow-lg hover:border-red-100 transition-all group sm:col-span-2 lg:col-span-1"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
             >
                <div className="bg-white p-4 rounded-2xl shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Phone size={32} />
                </div>
                <div>
                   <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">Call Us</h3>
                   <a href="tel:+919898989898" className="text-gray-600 font-sans font-medium text-lg hover:text-red-600 transition-colors">+91 98989 89898</a>
                   <p className="text-gray-500 text-sm mt-1 font-sans">Mon-Fri: 9am - 5pm</p>
                </div>
             </motion.div>
          </div>

          {/* Social Media Section */}
          <motion.div 
            className="w-full lg:w-1/2 bg-red-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-red-700 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">Join Our Digital Community</h2>
              <p className="text-red-100 font-sans text-lg mb-8 max-w-md leading-relaxed">
                Stay updated with our latest sermons, events, and community news. Connect with us on social media for daily inspiration and fellowship.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1">
                  <Facebook size={28} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1">
                  <Twitter size={28} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1">
                  <Instagram size={28} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1">
                  <Linkedin size={28} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1">
                  <Youtube size={28} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AddressCard;
