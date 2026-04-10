import { Pencil, Trash2, X, Plus } from "lucide-react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import CustomInput from "../../../../utils/CustomInput";
import FormBtn from "../../../../utils/FormBtn";
import UsehomepageChruchServicehook from "../../Hooks/UsehomepageChruchServicehook";
import { motion } from "framer-motion";
import { Calendar, Building, Clock, Save } from "lucide-react";

export default function ScheduleTable() {
  const {
    register,
    submitForm,
    deleteEntry,
    handleSubmit,
    scheduleData,
    modalOpen,
    selectedIndex,
    errors,
    openModal,
    closeModal,
  } = UsehomepageChruchServicehook();

  return (
    <OpenCloseLayout title="Church Service">
      <div className="flex justify-end mb-3">
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Week Days</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Service 1</th>
            <th className="border border-gray-300 px-4 py-2">Service 2</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-6 text-gray-500">
                No services yet — add one using “Add Service”
              </td>
            </tr>
          ) : (
            scheduleData.map((entry, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {entry?.day}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry?.department}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry?.service1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry?.service2}
                </td>

                <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => openModal(entry)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry?.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-100/90 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {selectedIndex === null ? "Add New Service" : `Edit Service Details`}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                {/* Day Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Day of the Week
                  </label>
                  <select
                    {...register("day")}
                    className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white shadow-sm"
                  >
                    <option value="">Select a day</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                  {errors.day && (
                    <span className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.day.message}
                    </span>
                  )}
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CustomInput
                    name="department"
                    label="Department"
                    placeholder="Main Service"
                    register={register}
                    error={errors.department}
                    icon={<Building className="w-4 h-4" />}
                  />

                  <CustomInput
                    name="service1"
                    label="Service 1"
                    placeholder="9:00 AM – 11:00 AM"
                    register={register}
                    error={errors.service1}
                    icon={<Clock className="w-4 h-4" />}
                  />

                  <CustomInput
                    name="service2"
                    label="Service 2"
                    placeholder="Optional"
                    register={register}
                    error={errors.service2}
                    icon={<Clock className="w-4 h-4" />}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                  >
                    <Save className="w-4 h-4" />
                    {selectedIndex === null ? 'Add Service' : 'Update Service'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </OpenCloseLayout>
  );
}
