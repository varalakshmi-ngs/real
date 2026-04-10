import React, { useState } from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { useForm } from "react-hook-form";
import ImageEditContainer from "../../../../utils/ImageEditContainer";
import CustomInput from "../../../../utils/CustomInput";
import { addPersonValidation } from "../../../../validations/AboutValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBtn from "../../../../utils/FormBtn";
import { Trash2 } from "lucide-react";
import { APIURL } from "../../../../Core/url";
import { apiRequest } from "../../../../services/ApiCalls";
import { motion } from "framer-motion";
import { User, Briefcase, FileText, Image as ImageIcon, Save, Users } from "lucide-react";

export default function AddTeamMember({ data, refreshData }) {
  const [imageFile, setImageFile] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addPersonValidation),
    defaultValues: {},
  });

  const submitForm = async (formdata) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();

      Object.entries(formdata).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await apiRequest({
        method: "post",
        url: "/about/addteammember",
        data: formDataToSend,
      });

      if (response.success) {
        setImageFile(null);
        refreshData();
        reset();
        setSubmitStatus({ type: 'success', message: 'Team member added successfully!' });
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to add team member. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred while adding member. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!memberToDelete) return;

    try {
      const response = await apiRequest({
        method: "delete",
        url: `/about/deletemember/${memberToDelete}`,
      });

      if (response.success) {
        refreshData();
        setDeleteModalOpen(false);
        setMemberToDelete(null);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const openDeleteModal = (id) => {
    setMemberToDelete(id);
    setDeleteModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <OpenCloseLayout title="Team Members">
      {/* Existing Members */}
      {data?.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Current Team Members</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((member) => (
              <ProfileCard
                key={member._id}
                name={member.name}
                onDelete={() => openDeleteModal(member._id)}
                description={member.description}
                designation={member.designation}
                image={`${APIURL}/${member.image}`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Add New Member Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Add New Team Member</h3>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border mb-6 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
            {/* Form Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Text Fields */}
              <motion.div variants={itemVariants} className="space-y-4">
                <CustomInput
                  register={register}
                  name="name"
                  label="Full Name"
                  placeholder="Enter member's full name"
                  error={errors.name}
                  icon={<User className="w-4 h-4" />}
                />

                <CustomInput
                  register={register}
                  name="designation"
                  label="Position/Role"
                  placeholder="Enter position or role"
                  error={errors.designation}
                  icon={<Briefcase className="w-4 h-4" />}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Enter a brief description about the team member"
                    rows={4}
                    className="w-full border border-slate-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-slate-900 shadow-sm"
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Right Column - Image */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-5 h-5 text-slate-600" />
                  <h4 className="text-md font-medium text-slate-800">Profile Photo</h4>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <ImageEditContainer onImageChange={setImageFile} />
                  <p className="text-sm text-slate-500 mt-4 text-center">
                    Upload a professional photo of the team member
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-end pt-6 border-t border-slate-200"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Adding...' : 'Add Team Member'}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteUser}
          message="Are you sure you want to delete this team member?"
        />
      )}
    </OpenCloseLayout>
  );
}

// Component for confirmation modal
function ConfirmDeleteModal({ onCancel, onConfirm, message }) {
  return (
    <div className="fixed inset-0 bg-slate-100/90 flex justify-center items-center z-20 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ image, name, designation, description, onDelete }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden relative">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 z-10"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>

      {/* Image */}
      <div className="w-full h-56 bg-gray-200">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{designation}</p>
        <p className="mt-2 text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
}
