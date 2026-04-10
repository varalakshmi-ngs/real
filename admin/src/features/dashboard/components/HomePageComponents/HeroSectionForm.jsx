import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { heroSectionValidation } from "../../../../validations/HomePageValidations";
import CustomInput from "../../../../utils/CustomInput";
import ImageEditContainer from "../../../../utils/ImageEditContainer";
import FormBtn from "../../../../utils/FormBtn";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { apiRequest } from "../../../../services/ApiCalls";
import { APIURL } from "../../../../Core/url";
import { motion } from "framer-motion";
import { Save, Image as ImageIcon, FileText, Link } from "lucide-react";

export default function HeroForm({ data }) {
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(heroSectionValidation),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [data]);

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
        method: "put",
        url: "/home/hero",
        data: formDataToSend,
      });

      if (response.success) {
        setSubmitStatus({ type: 'success', message: 'Hero section updated successfully!' });
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to update hero section. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred while updating. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
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
    <OpenCloseLayout>
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(submitForm)}
        className="space-y-8"
      >
        {/* Status Message */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              submitStatus.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {submitStatus.message}
          </motion.div>
        )}

        {/* Form Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Text Fields */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-800">Hero Content</h3>
            </div>

            <div className="space-y-4">
              <CustomInput
                register={register}
                name="title"
                label="Title"
                placeholder="Enter main hero title"
                error={errors.title}
                icon={<FileText className="w-4 h-4" />}
              />

              <CustomInput
                register={register}
                name="subText"
                label="Sub-Text"
                placeholder="Enter subtitle or description"
                error={errors.subText}
                icon={<FileText className="w-4 h-4" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomInput
                  register={register}
                  name="buttonText"
                  label="Button Text"
                  placeholder="Call to action text"
                  error={errors.buttonText}
                  icon={<FileText className="w-4 h-4" />}
                />

                <CustomInput
                  register={register}
                  name="buttonLink"
                  label="Button Link"
                  placeholder="https://example.com"
                  error={errors.buttonLink}
                  icon={<Link className="w-4 h-4" />}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-5 h-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-800">Hero Image</h3>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <ImageEditContainer
                existingImage={`${APIURL}/${data?.image}`}
                onImageChange={setImageFile}
              />
              <p className="text-sm text-slate-500 mt-4 text-center">
                Upload a high-quality image for your hero section
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
            {isSubmitting ? 'Updating...' : 'Update Hero Section'}
          </motion.button>
        </motion.div>
      </motion.form>
    </OpenCloseLayout>
  );
}
