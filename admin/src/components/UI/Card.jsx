import { motion } from "framer-motion";

export const Card = ({ children, className = "", animated = true, onClick, ...props }) => {
  const cardClass = `bg-white/95 border border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`;

  if (animated) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cardClass}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export const StatCard = ({ title, value, icon, trend, color = "blue" }) => {
  const colorGradients = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
    indigo: "from-indigo-500 to-blue-500",
  };

  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className={`bg-gradient-to-br ${colorGradients[color]} p-3 rounded-lg`}>
          {icon}
        </div>
        {trend && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-sm font-semibold ${trend > 0 ? "text-green-400" : "text-red-400"}`}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </motion.span>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </Card>
  );
};

export default Card;
