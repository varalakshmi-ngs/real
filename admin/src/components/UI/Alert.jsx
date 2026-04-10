import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export const Alert = ({ type = "info", title, message, onClose, closeable = true }) => {
  const styles = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: "text-green-400",
      title: "text-green-300",
      Icon: CheckCircle,
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: "text-red-400",
      title: "text-red-300",
      Icon: AlertCircle,
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      icon: "text-yellow-400",
      title: "text-yellow-300",
      Icon: AlertTriangle,
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      title: "text-blue-300",
      Icon: Info,
    },
  };

  const style = styles[type];
  const Icon = style.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${style.bg} border ${style.border} rounded-lg p-4 flex gap-4`}
    >
      <Icon className={style.icon} size={20} />
      <div className="flex-1">
        {title && <h4 className={`${style.title} font-semibold text-sm mb-1`}>{title}</h4>}
        <p className="text-slate-700 text-sm">{message}</p>
      </div>
      {closeable && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-slate-400 hover:text-slate-300 transition-colors"
        >
          <X size={18} />
        </motion.button>
      )}
    </motion.div>
  );
};

export const Toast = ({ type, message, duration = 3000, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-4 shadow-lg"
    >
      {type === "success" && <CheckCircle className="text-green-500" size={20} />}
      {type === "error" && <AlertCircle className="text-red-400" size={20} />}
      {type === "warning" && <AlertTriangle className="text-yellow-400" size={20} />}
      {type === "info" && <Info className="text-blue-400" size={20} />}
      <p className="text-slate-100">{message}</p>
    </motion.div>
  );
};

export const Notification = ({ 
  icon, 
  title, 
  message, 
  timestamp, 
  onDismiss, 
  action,
  actionLabel 
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
  >
    <div className="flex gap-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-600">{message}</p>
        {timestamp && <p className="text-xs text-slate-500 mt-2">{timestamp}</p>}
        {actionLabel && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={action}
            className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            {actionLabel} →
          </motion.button>
        )}
      </div>
      {onDismiss && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-300"
        >
          <X size={16} />
        </motion.button>
      )}
    </div>
  </motion.div>
);

export default Alert;
