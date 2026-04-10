import React, { useEffect, useState } from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../utils/CustomInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBtn from "../../../../utils/FormBtn";
import { isAxiosError } from "axios";
import { errorMsgApi, successfully } from "../../../../Core/tosts";
import { API } from "../../../../Core/url";

export default function SocialLinksForm() {
  const [data, setData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  const getLinks = async () => {
    try {
      const resp = await API.get("/about/social-links");

      setData(resp.data);
    } catch (error) {
      if (isAxiosError(error)) {
        errorMsgApi(error?.response?.data?.message);
      } else {
        errorMsgApi("Unexpected Error");
      }
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const validation = z.object({
    facebook: z.string().url({ message: "Enter a valid url" }),
    twitter: z.string().url({ message: "Enter a valid url" }),
    instagram: z.string().url({ message: "Enter a valid url" }),
    youtube: z.string().url({ message: "Enter a valid url" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validation),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  const submitFn = async (data) => {
    try {
      const resp = await API.post("/about/social-links", data);

      setData(resp.data);
      successfully("Updated");
    } catch (error) {
      if (isAxiosError(error)) {
        errorMsgApi(error?.response?.data?.message);
      } else {
        errorMsgApi("Unexpected Error");
      }
    }
  };

  return (
    <OpenCloseLayout title="Social Links">
      <form onSubmit={handleSubmit(submitFn)}>
        <CustomInput
          error={errors.facebook}
          label={"Facebook"}
          register={register}
          name={"facebook"}
        />
        <CustomInput
          error={errors.twitter}
          label={"Twitter"}
          register={register}
          name={"twitter"}
        />
        <CustomInput
          error={errors.instagram}
          label={"Instagram"}
          register={register}
          name={"instagram"}
        />
        <CustomInput
          error={errors.youtube}
          label={"Youtube"}
          register={register}
          name={"youtube"}
        />
        <FormBtn icon={null} style={"self-end"} type="submit" title="Save" />
      </form>
    </OpenCloseLayout>
  );
}
