import React, { useState, useEffect } from "react";
import { Bell, Search, User, LogOut, Settings, Church, Menu, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { API } from "../../Core/url";
import { formatDistanceToNow } from "date-fns";


const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();
  const location = useLocation();

  const fetchNotifications = async () => {
    try {
      const resp = await API.get("/web/get-notifications");
      if (resp.data) {
        setNotifications(resp.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh every 2 minutes
    const interval = setInterval(fetchNotifications, 120000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

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
    // { name: "Blogs", path: "/blogs" },
    { name: "Prayer Requests", path: "/request-prayer" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenus = () => {
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
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
        <div className="container mx-auto sm:px-8 border-b border-gray-100 flex items-center justify-between py-2">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo2.png"
              height={40}
              width={50}
              alt="Logo"
              className="object-contain sm:h-[50px] sm:w-[60px]"
              style={{ width: "auto" }}
            />
          </Link>

          <h1 className="font-black tracking-tight text-[12px] xs:text-[16px] sm:text-[32px] md:text-[42px] lg:text-[52px] text-[#022147] whitespace-nowrap uppercase text-center flex-grow px-2">
            Real Temple
          </h1>

          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo2.png"
              height={40}
              width={50}
              alt="Logo"
              className="object-contain sm:h-[50px] sm:w-[60px]"
              style={{ width: "auto" }}
            />
          </Link>
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link to="/dashboard" className="flex items-center gap-2">
                <Church className="h-8 w-8 text-blue-600" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Real Temple</span>
                  <span className="hidden xs:inline text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">Admin Panel</span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1 ml-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right side - Search, notifications, and profile */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileOpen(false);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 xs:w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-bold">{unreadCount} New</span>}
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-400">
                            <Bell size={24} className="mx-auto mb-2 opacity-20" />
                            <p className="text-xs">No new notifications</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${notification.unread ? "bg-blue-50/30" : ""}`}
                            >
                              <p className="text-sm text-gray-800 font-medium leading-snug">{notification.message}</p>
                              <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                                <Clock size={10} />
                                <span>{formatDistanceToNow(new Date(notification.time), { addSuffix: true })}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 sm:p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                    {user?.email?.charAt(0) || "A"}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold">
                    {user?.email?.split('@')[0] || "Admin"}
                  </span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Account</div>
                        <div className="text-sm font-bold text-gray-900 truncate mt-1">{user?.email}</div>
                      </div>
                      <div className="p-2">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                          <Settings size={16} />
                          Settings
                        </button>
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

      {/* Mobile Menu Slide-out Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenus}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <Church className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-xl font-black text-gray-900 tracking-tight">Real Temple</span>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenus}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${location.pathname === item.path
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

