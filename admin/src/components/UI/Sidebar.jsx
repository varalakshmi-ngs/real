import {
  Home,
  Edit,
  Image,
  Info,
  HandCoins,
  Calendar,
  Newspaper,
  HandHeart,
  Mail,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const menuItems = [
  { name: "Dashboard", icon: Home, to: "/", badge: null },
  {
    name: "Content",
    icon: Edit,
    submenu: [
      { name: "Home Page", to: "/home" },
      { name: "About", to: "/about" },
      { name: "Gallery", to: "/gallery" },
    ],
  },
  { name: "Events", icon: Calendar, to: "/event", badge: null },
  { name: "Magazines", icon: Newspaper, to: "/magazine", badge: null },
  { name: "Contributions", icon: HandCoins, to: "/contribution", badge: null },
  { name: "Blogs", icon: Edit, to: "/blogs", badge: null },
  { name: "Prayer Requests", icon: HandHeart, to: "/request-prayer", badge: null },
  { name: "Contact Messages", icon: Mail, to: "/contact", badge: null },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex h-screen bg-white border-r border-slate-200 shadow-lg flex-col w-64 overflow-hidden fixed left-0 top-0 z-40"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Admin Panel
          </h2>
          <p className="text-xs text-slate-500 mt-1">Real Temple Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-1">
          {menuItems.map((item, index) => {
            const isActive = item.to && location.pathname === item.to;
            const hasSubmenu = item.submenu;
            const isSubmenuOpen = openSubmenu === item.name;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {hasSubmenu ? (
                  <motion.button
                    onClick={() =>
                      setOpenSubmenu(
                        isSubmenuOpen ? null : item.name
                      )
                    }
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isSubmenuOpen
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="flex-1 text-left">
                      {item.name}
                    </span>
                    <motion.div
                      animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>
                ) : (
                  <Link to={item.to || "#"}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="flex-1 text-left">
                        {item.name}
                      </span>
                      {item.badge && (
                        <motion.span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {hasSubmenu && isSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pt-1 space-y-1">
                        {item.submenu.map((subitem) => {
                          const isSubActive =
                            location.pathname === subitem.to;
                          return (
                            <Link key={subitem.name} to={subitem.to}>
                              <motion.div
                                whileHover={{ x: 4 }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                  isSubActive
                                    ? "text-blue-600 font-medium"
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                {subitem.name}
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <motion.button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden h-screen bg-white border-r border-slate-200 shadow-lg flex flex-col w-64 overflow-hidden fixed left-0 top-0 z-50"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Admin Panel
          </h2>
          <p className="text-xs text-slate-500 mt-1">Real Temple Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-1">
          {menuItems.map((item, index) => {
            const isActive = item.to && location.pathname === item.to;
            const hasSubmenu = item.submenu;
            const isSubmenuOpen = openSubmenu === item.name;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {hasSubmenu ? (
                  <motion.button
                    onClick={() =>
                      setOpenSubmenu(
                        isSubmenuOpen ? null : item.name
                      )
                    }
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isSubmenuOpen
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="flex-1 text-left">
                      {item.name}
                    </span>
                    <motion.div
                      animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>
                ) : (
                  <Link to={item.to || "#"} onClick={() => setSidebarOpen(false)}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="flex-1 text-left">
                        {item.name}
                      </span>
                      {item.badge && (
                        <motion.span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {hasSubmenu && isSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pt-1 space-y-1">
                        {item.submenu.map((subitem) => {
                          const isSubActive =
                            location.pathname === subitem.to;
                          return (
                            <Link key={subitem.name} to={subitem.to} onClick={() => setSidebarOpen(false)}>
                              <motion.div
                                whileHover={{ x: 4 }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                  isSubActive
                                    ? "text-blue-600 font-medium"
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                {subitem.name}
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <motion.button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;