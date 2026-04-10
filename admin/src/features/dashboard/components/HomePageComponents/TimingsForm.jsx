import { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../../../../services/ApiCalls";
import { motion } from "framer-motion";

export default function TimingsForm({ data, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    morningService: data?.morningService || "",
    eveningService: data?.eveningService || "",
    sundaySchool: data?.sundaySchool || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiRequest({
        method: "put",
        url: "/home/timings",
        data: formData,
      });

      if (response) {
        toast.success("Timings uploaded successfully!");
        if (refreshData) refreshData();
      }
    } catch (error) {
      toast.error("Failed to upload timings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 bg-white text-slate-900 shadow-sm rounded-2xl border border-slate-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Church Timings</h2>
      
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Morning Service</label>
          <input
            type="text"
            name="morningService"
            value={formData.morningService}
            onChange={handleChange}
            placeholder="e.g. 10:00 AM"
            className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Evening Service</label>
          <input
            type="text"
            name="eveningService"
            value={formData.eveningService}
            onChange={handleChange}
            placeholder="e.g. 6:00 PM"
            className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Sunday School</label>
          <input
            type="text"
            name="sundaySchool"
            value={formData.sundaySchool}
            onChange={handleChange}
            placeholder="e.g. 8:30 AM"
            className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="col-span-1 md:col-span-3 flex justify-end mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors w-full md:w-auto"
          >
            {loading ? "Updating..." : "Update Timings"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
