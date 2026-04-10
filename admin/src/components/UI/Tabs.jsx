import { motion } from "framer-motion";

const Tabs = ({ tabs, activeTab, onChange, className = "" }) => {
  return (
    <div className={`flex gap-2 border-b border-slate-200 ${className}`}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 font-semibold text-sm relative transition-colors ${
            activeTab === tab.id ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
          }`}
          whileHover={{ color: "#111827" }}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default Tabs;
