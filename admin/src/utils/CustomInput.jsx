import React, { useId } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Upload, Calendar, FileText } from "lucide-react";

export default function CustomInput({
  label,
  register,
  name,
  error,
  accept,
  multiple = false,
  type = "text",
  customStyl = "w-full",
  placeholder,
  options = [],
  showPasswordToggle = false,
  onPasswordToggle,
  isPasswordVisible = false,
}) {
  const id = useId();

  const getIcon = () => {
    switch (type) {
      case "date":
        return <Calendar size={18} className="text-slate-400" />;
      case "file":
        return <Upload size={18} className="text-slate-400" />;
      case "textarea":
        return <FileText size={18} className="text-slate-400" />;
      default:
        return null;
    }
  };

  const baseInputClasses = "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-slate-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-2 ${customStyl}`}
    >
      {label && (
        <motion.label
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="font-semibold text-sm text-slate-700"
          htmlFor={id}
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {type === "select" ? (
          <motion.select
            id={id}
            {...register(name)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className={`${baseInputClasses} appearance-none cursor-pointer pr-10`}
          >
            <option value="" className="bg-white text-slate-600">Select a category</option>
            {options.map((opt) => (
              <option key={opt} value={opt} className="bg-white text-slate-700">
                {opt}
              </option>
            ))}
          </motion.select>
        ) : type === "textarea" ? (
          <motion.textarea
            id={id}
            {...register(name)}
            placeholder={placeholder}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className={`${baseInputClasses} min-h-[120px] resize-y pr-12`}
          />
        ) : (
          <motion.input
            id={id}
            {...register(name)}
            type={type === "password" && isPasswordVisible ? "text" : type}
            placeholder={placeholder}
            multiple={multiple}
            accept={accept}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className={`${baseInputClasses} ${getIcon() ? 'pl-12' : ''} ${showPasswordToggle ? 'pr-12' : ''}`}
          />
        )}

        {/* Left Icon */}
        {getIcon() && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {getIcon()}
          </div>
        )}

        {/* Password Toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Select Arrow */}
        {type === "select" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-red-400 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message || error}
        </motion.span>
      )}
    </motion.div>
  );
}
