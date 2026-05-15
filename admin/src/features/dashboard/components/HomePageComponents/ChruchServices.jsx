import { Pencil, Trash2, X, Plus } from "lucide-react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import CustomInput from "../../../../utils/CustomInput";
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
      {/* Header Button */}
      <div className="flex justify-center sm:justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="
            flex items-center justify-center gap-2
            w-full sm:w-auto
            px-4 py-2
            bg-green-600 text-white
            rounded-xl
            hover:bg-green-700
            transition-all
            duration-300
            text-sm sm:text-base
            font-medium
          "
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-[700px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-3 py-3 text-sm font-semibold text-slate-700 text-left">
                Week Days
              </th>

              <th className="border border-gray-200 px-3 py-3 text-sm font-semibold text-slate-700 text-left">
                Department
              </th>

              <th className="border border-gray-200 px-3 py-3 text-sm font-semibold text-slate-700 text-left">
                Service 1
              </th>

              <th className="border border-gray-200 px-3 py-3 text-sm font-semibold text-slate-700 text-left">
                Service 2
              </th>

              <th className="border border-gray-200 px-3 py-3 text-sm font-semibold text-slate-700 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {scheduleData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6 text-gray-500 text-sm"
                >
                  No services yet — add one using “Add Service”
                </td>
              </tr>
            ) : (
              scheduleData.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="border border-gray-200 px-3 py-3 text-sm capitalize">
                    {entry?.day}
                  </td>

                  <td className="border border-gray-200 px-3 py-3 text-sm">
                    {entry?.department}
                  </td>

                  <td className="border border-gray-200 px-3 py-3 text-sm">
                    {entry?.service1}
                  </td>

                  <td className="border border-gray-200 px-3 py-3 text-sm">
                    {entry?.service2 || "-"}
                  </td>

                  <td className="border border-gray-200 px-3 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => openModal(entry)}
                        className="
                          text-blue-600
                          hover:text-blue-800
                          transition-colors
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteEntry(entry?.id)}
                        className="
                          text-red-600
                          hover:text-red-800
                          transition-colors
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-hidden
            "
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold">
                  {selectedIndex === null
                    ? "Add New Service"
                    : "Edit Service Details"}
                </h2>

                <button
                  onClick={closeModal}
                  className="hover:text-red-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <form
                onSubmit={handleSubmit(submitForm)}
                className="space-y-5"
              >
                {/* Day */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Day of the Week
                  </label>

                  <div className="relative">
  <select
    {...register("day")}
    className="
      w-full
      border border-slate-300
      rounded-xl
      p-3
      pr-10
      bg-white
      text-slate-800
      appearance-none
      focus:outline-none
      focus:ring-2
      focus:ring-red-500
    "
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

  {/* Custom Arrow */}
  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    <svg
      className="w-5 h-5 text-slate-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>
                  {errors.day && (
                    <span className="text-red-500 text-sm">
                      {errors.day.message}
                    </span>
                  )}
                </div>

                {/* Inputs */}
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

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-slate-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={closeModal}
                    className="
                      w-full sm:w-auto
                      px-5 py-3
                      border border-slate-300
                      text-slate-700
                      rounded-xl
                    "
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="
                      w-full sm:w-auto
                      flex items-center justify-center gap-2
                      bg-gradient-to-r from-red-600 to-red-700
                      text-white
                      font-semibold
                      py-3 px-6
                      rounded-xl
                    "
                  >
                    <Save className="w-4 h-4" />

                    {selectedIndex === null
                      ? "Add Service"
                      : "Update Service"}
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