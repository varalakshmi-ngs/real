import React, { useState, useEffect, useRef } from "react";
import {
  User,
  LogOut,
  Church,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Watch", path: "/watch" },
    { name: "Events", path: "/event" },
    { name: "Magazines", path: "/magazine" },
    { name: "Contributions", path: "/contribution" },
    { name: "Prayer Requests", path: "/request-prayer" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenus = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30"
      >
        {/* TOP HEADER */}
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 border-b border-gray-100 flex items-center justify-between py-2 sm:py-3">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo2.png"
              alt="Logo"
              className="object-contain h-[38px] w-[42px] sm:h-[50px] sm:w-[60px]"
            />
          </Link>

          <h1 className="hidden sm:block font-black tracking-tight sm:text-[30px] md:text-[42px] lg:text-[45px] text-[#022147] whitespace-nowrap uppercase text-center flex-grow px-2 truncate">
              Real Temple
          </h1>

          {/* TOP-RIGHT INFO */}
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-xs sm:text-[16px] font-black tracking-tight text-[#022147] uppercase">
              Admin Panel
            </span>
            <div className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm mt-0.5 sm:mt-1">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] sm:text-sm font-medium text-gray-600">System Online</span>
              <span className="text-gray-300 text-xs">|</span>
              <span className="text-[9px] sm:text-xs text-gray-400">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="px-3 sm:px-5 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* DESKTOP NAVIGATION */}
              <nav className="hidden xl:flex items-center gap-1 overflow-x-auto">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-2 xl:px-3 py-2 rounded-md text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* PROFILE */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="flex items-center gap-2 p-1 sm:p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                    {user?.email?.charAt(0) || "A"}
                  </div>

                  <span className="hidden sm:block text-sm font-semibold">
                    {user?.email?.split("@")[0] || "Admin"}
                  </span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-[220px] sm:w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                          Account
                        </div>

                        <div className="text-sm font-bold text-gray-900 truncate mt-1">
                          {user?.email}
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenus}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 xl:hidden"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl z-50 xl:hidden flex flex-col"
            >
              <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <Church className="h-8 w-8 text-blue-600 mr-2" />

                <span className="text-xl font-black text-gray-900 tracking-tight">
                  Real Temple
                </span>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenus}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;