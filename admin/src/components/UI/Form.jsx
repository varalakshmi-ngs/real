import { motion } from "framer-motion";

export const Form = ({ onSubmit, children, className = "" }) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onSubmit={onSubmit}
    className={`space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm ${className}`}
  >
    {children}
  </motion.form>
);

export const FormGroup = ({ label, error, required, children, help }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    {label && (
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-red-600 text-sm">{error}</p>}
    {help && !error && <p className="text-slate-500 text-sm">{help}</p>}
  </motion.div>
);

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  error,
  className = "",
}) => (
  <motion.select
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
      error ? "border-red-500" : ""
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    whileFocus={{ boxShadow: "0 0 18px rgba(59, 130, 246, 0.15)" }}
  >
    <option value="" disabled hidden>
      {placeholder}
    </option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} className="bg-white text-slate-700">
        {opt.label}
      </option>
    ))}
  </motion.select>
);

export const Checkbox = ({ label, checked, onChange, disabled = false }) => (
  <motion.label className="flex items-center gap-3 cursor-pointer" whileHover={{ x: 2 }}>
    <motion.input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="w-5 h-5 rounded border-slate-600 text-blue-500 accent-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <span className="text-slate-300">{label}</span>
  </motion.label>
);

export const Radio = ({ options, value, onChange, name }) => (
  <div className="space-y-2">
    {options.map((option) => (
      <motion.label key={option.value} className="flex items-center gap-3 cursor-pointer" whileHover={{ x: 2 }}>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          className="w-5 h-5 accent-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-slate-300">{option.label}</span>
      </motion.label>
    ))}
  </div>
);

export const Switch = ({ enabled, onChange, label, disabled = false }) => (
  <motion.div className="flex items-center gap-3">
    <motion.button
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
        enabled ? "bg-blue-600" : "bg-slate-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <motion.span
        animate={{ x: enabled ? 28 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
      />
    </motion.button>
    {label && <span className="text-slate-300">{label}</span>}
  </motion.div>
);

export default Form;
