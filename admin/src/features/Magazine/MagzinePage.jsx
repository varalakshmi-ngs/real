import { useMagazinePostHook } from "./Hooks/MagazinePostHook";
import CustomInput from "../../utils/CustomInput";
import PdfPreview from "./components/Preview";
import Table from "../../utils/table/Table";
import { useMagazineGetHook } from "./Hooks/MagazineGetHook";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function MagzinePage() {
  const { columns, data, getMagazines, getLoading } = useMagazineGetHook();
  const { register, document, handleSubmit, errors, loading } =
    useMagazinePostHook({ getMagazines });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 pb-12 w-full"
    >
      <motion.form variants={itemVariants} onSubmit={handleSubmit} className="bg-white text-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Upload New Magazine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            label={"Title"}
            register={register}
            type="text"
            name={"title"}
            error={errors.title}
          />
          <CustomInput
            label={"Sub Title"}
            register={register}
            type="text"
            name={"subTitle"}
            error={errors.subTitle}
          />
        </div>
        <div className="w-full">
          <CustomInput
            label={"Choose Magazine Pdf"}
            register={register}
            type="file"
            name={"pdf"}
            error={errors.pdf}
          />
        </div>

        <PdfPreview preview={document?.[0]} />

        <div className="flex justify-end mt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-[200px] bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors flex justify-center items-center"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Upload Magazine"}
          </motion.button>
        </div>
      </motion.form>

      <motion.div variants={itemVariants} className="bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 p-2 overflow-hidden">
        {getLoading ? (
          <div className="w-full h-[300px] items-center justify-center flex">
            <ClipLoader color="red" />
          </div>
        ) : (
          <Table columns={columns} data={data} showPagination={false} />
        )}
      </motion.div>
    </motion.div>
  );
}
