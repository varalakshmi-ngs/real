import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-gray-50 min-w-full">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
