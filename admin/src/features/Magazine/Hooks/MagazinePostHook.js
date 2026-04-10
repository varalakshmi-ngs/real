import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";
import { useState } from "react";
export const useMagazinePostHook = ({ getMagazines }) => {
  const validation = z.object({
    pdf: z
      .instanceof(FileList, { message: "This is a required field" })
      .refine((files) => files.length > 0, "Please select a PDF file")
      .refine(
        (files) => files[0]?.type === "application/pdf",
        "Only PDF files are allowed"
      )
      .refine(
        (files) => files[0]?.size <= 10 * 1024 * 1024,
        "File size must be less than 10MB"
      ),
    title: z
      .string()
      .min(3, { message: "Title should be at least 3 characters" }),
    subTitle: z
      .string()
      .min(5, { message: "Description should be at least 5 characters" }),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });
  const document = watch("pdf");

  const [loading, setLoading] = useState(false);

  async function submitFn(data) {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("pdf", data.pdf[0]);
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle);
      const resp = await API.post("/magazine", formData);
      reset();
      successfully("Submitted Success");
      getMagazines();
    } catch (error) {
      if (isAxiosError(error)) {
        errorMsgApi(error?.response?.data?.message);
      } else {
        errorMsgApi(error?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    document,
    handleSubmit: handleSubmit(submitFn),
    errors,
    loading,
  };
};
