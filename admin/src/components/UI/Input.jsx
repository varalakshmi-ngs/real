import { motion } from "framer-motion";
import { useState } from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  icon: Icon,
  required = false,
  helperText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon size={20} />
          </div>
        )}
        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 bg-white border rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none transition-all duration-300 ${
            isFocused
              ? "border-blue-500 ring-1 ring-blue-500/50 shadow-lg shadow-blue-500/20"
              : error
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-slate-300 hover:border-slate-400"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-slate-500 text-sm mt-1">{helperText}</p>}
    </motion.div>
  );
};

export const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <motion.textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none resize-none transition-all duration-300 ${
          isFocused
            ? "border-blue-500 ring-1 ring-blue-500/50 shadow-lg shadow-blue-500/20"
            : error
            ? "border-red-500 ring-1 ring-red-500/20"
            : "border-slate-300 hover:border-slate-400"
        }`}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </motion.div>
  );
};

export default Input;
