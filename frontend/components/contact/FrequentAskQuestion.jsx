"use client";
import { Plus, Minus } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FrequentAskQuestion = () => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the service timings at The Real Temple?",
      answer:
        "The Real Temple Church conducts worship services every Sunday at 9:00 AM and 11:00 AM, and midweek service on Wednesdays at 7:00 PM. Join us at one of the best churches in Hyderabad to experience a powerful Christian fellowship.",
    },
    {
      question: "Do I need to be a member to attend a service?",
      answer:
        "No, you do not need to be a member. Everyone is welcome at the Real Temple Church, whether you’re new to faith or simply exploring. This Christian temple church in Hyderabad is open to all.",
    },
    {
      question: "How can I request a prayer?",
      answer:
        "To submit a prayer request, visit the prayer section on our website or fill out a form during any temple church service. Our prayer team will personally pray for your needs and connect with you.",
    },
    {
      question: "How can I give an offering or donation?",
      answer:
        "You can give securely online through our donation page. Support the mission of this Christian temple church through tithes, offerings, and special donations — every contribution helps build the Kingdom.",
    },
    {
      question: "Are there programs for children and youth?",
      answer:
        "Yes! We have dedicated, age-appropriate programs for children during our Sunday services, as well as an active Youth Ministry that meets on Friday evenings for worship, teachings, and fellowship.",
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-6 sm:px-12 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <div className="h-1 bg-red-600 w-24 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 font-sans text-lg max-w-2xl mx-auto">
            Find answers to common questions about our church, services, and community.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-red-200 bg-red-50/30 shadow-md' : 'border-gray-200 bg-white hover:border-red-300'}`}
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg font-bold font-serif transition-colors ${isOpen ? 'text-red-600' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 ml-4 p-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600 font-sans leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FrequentAskQuestion;
