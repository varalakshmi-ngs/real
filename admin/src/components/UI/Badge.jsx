import { motion } from "framer-motion";

const Badge = ({ children, variant = "default", size = "md", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-500/20 text-blue-300 border border-blue-500/50",
    success: "bg-green-500/20 text-green-300 border border-green-500/50",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50",
    danger: "bg-red-500/20 text-red-300 border border-red-500/50",
    purple: "bg-purple-500/20 text-purple-300 border border-purple-500/50",
    slate: "bg-slate-500/20 text-slate-300 border border-slate-500/50",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-semibold",
    md: "px-3 py-1.5 text-sm font-semibold",
    lg: "px-4 py-2 text-base font-semibold",
  };

  return (
    <motion.span
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={`inline-block rounded-lg ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
