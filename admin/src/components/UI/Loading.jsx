import { motion } from "framer-motion";

export const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizes[size]} border-3 border-slate-300 border-t-blue-500 rounded-full`}
    />
  );
};

export const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <Spinner size="lg" />
      <p className="text-slate-700 font-semibold">Loading...</p>
    </motion.div>
  </div>
);

export default Spinner;
