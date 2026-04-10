import { motion } from "framer-motion";

export const Breadcrumb = ({ items }) => (
  <motion.nav
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2 text-sm"
  >
    {items.map((item, index) => (
      <motion.div key={index} className="flex items-center gap-2">
        {index > 0 && <span className="text-slate-500">›</span>}
        <motion.a
          href={item.href}
          whileHover={{ color: "#e0f2fe" }}
          className={`transition-colors ${
            index === items.length - 1
              ? "text-slate-300 cursor-default"
              : "text-blue-400 hover:text-blue-300 cursor-pointer"
          }`}
        >
          {item.label}
        </motion.a>
      </motion.div>
    ))}
  </motion.nav>
);

export const PageHeader = ({ title, subtitle, breadcrumb, action }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    {breadcrumb && <Breadcrumb items={breadcrumb} />}
    <div className="flex items-start justify-between gap-4 mt-4">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        {subtitle && <p className="text-slate-600">{subtitle}</p>}
      </div>
      {action && <div className="flex gap-3">{action}</div>}
    </div>
  </motion.div>
);

export const EmptyState = ({ icon, title, message, action }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-12 px-4"
  >
    <div className="text-6xl mb-4 text-slate-500">{icon}</div>
    <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-center mb-6 max-w-md">{message}</p>
    {action && <div className="flex gap-3">{action}</div>}
  </motion.div>
);

export const Skeleton = ({ count = 1, className = "" }) => (
  <div className="space-y-4">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`h-12 bg-slate-200 rounded-lg ${className}`}
        />
      ))}
  </div>
);

export const Divider = ({ className = "", vertical = false }) => (
  <div
    className={`${
      vertical ? "w-px bg-slate-300" : "h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
    } ${className}`}
  />
);

export const Progress = ({ value, max = 100, showLabel = true, color = "blue" }) => {
  const percentage = (value / max) * 100;
  const colors = {
    blue: "from-blue-600 to-blue-500",
    green: "from-green-600 to-green-500",
    yellow: "from-yellow-600 to-yellow-500",
    red: "from-red-600 to-red-500",
  };

  return (
    <div className="space-y-2">
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colors[color]}`}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-slate-500">
          {value} / {max} ({percentage.toFixed(0)}%)
        </p>
      )}
    </div>
  );
};

export const Avatar = ({ 
  src, 
  name = "", 
  size = "md", 
  initials,
  status,
  onClick 
}) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 ${sizes[size]} cursor-pointer overflow-hidden`}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : initials ? (
        <span className="text-white font-semibold text-sm">{initials}</span>
      ) : (
        <span className="text-white font-semibold text-sm">{name.charAt(0)}</span>
      )}
      {status && (
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
            status === "online" ? "bg-green-500" : "bg-slate-500"
          }`}
        />
      )}
    </motion.div>
  );
};

export const Badge2D = ({ children, className = "", ...props }) => (
  <motion.span
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-slate-200 to-slate-100 text-xs font-semibold text-slate-700 ${className}`}
    {...props}
  >
    {children}
  </motion.span>
);

export default PageHeader;
