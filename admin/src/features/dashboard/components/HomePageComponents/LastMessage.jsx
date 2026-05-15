import { useEffect, useState } from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import CustomInput from "../../../../utils/CustomInput";
import ImageEditContainer from "../../../../utils/ImageEditContainer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBtn from "../../../../utils/FormBtn";
import { LastMessageValidation } from "../../../../validations/HomePageValidations";
import { APIURL } from "../../../../Core/url";
import { apiRequest } from "../../../../services/ApiCalls";

export default function LastMessage({ data }) {
  const [ImageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LastMessageValidation),
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const submitForm = async (formdata) => {
    const formDataToSend = new FormData();

    Object.entries(formdata).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (ImageFile) {
      formDataToSend.append("image", ImageFile);
    }

    const response = await apiRequest({
      method: "put",
      url: "/home/latestmessage",
      data: formDataToSend,
    });

    console.log(response);
  };

  return (
    <OpenCloseLayout title="Latest Message">
      <div className="w-full">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full"
        >
          {/* Main Responsive Layout */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-6
              lg:gap-10
              w-full
            "
          >
            {/* LEFT SIDE */}
            <div className="w-full lg:w-[60%] space-y-4">
              <CustomInput
                name="heading"
                label="Heading"
                placeholder="Finding Peace in Troubled Times"
                register={register}
                error={errors.heading}
              />

              <CustomInput
                name="description"
                label="Description"
                placeholder="Sermon description here..."
                register={register}
                error={errors.description}
                type="textarea"
              />

              <CustomInput
                name="hostName"
                label="Host Name"
                placeholder="Pastor Michael Johnson"
                register={register}
                error={errors.hostName}
              />

              <CustomInput
                name="title"
                label="Title"
                placeholder="Pastor"
                register={register}
                error={errors.title}
              />

              <CustomInput
                name="youtubeLink"
                label="YouTube Channel Link"
                placeholder="Real temple"
                register={register}
                error={errors.youtubeLink}
              />
            </div>

            {/* RIGHT SIDE */}
            <div
              className="
                w-full
                lg:w-[40%]
                flex
                flex-col
                items-center
                justify-start
              "
            >
              <div
                className="
                  w-full
                  max-w-[350px]
                  border
                  border-slate-200
                  rounded-2xl
                  p-4
                  bg-white
                  shadow-sm
                "
              >
                <ImageEditContainer
                  existingImage={`${APIURL}/${data?.thumbnailImage}`}
                  onImageChange={setImageFile}
                />

                <div className="mt-5">
                  <FormBtn
                    type="submit"
                    icon={null}
                    style="
                      w-full
                      h-[48px]
                      rounded-xl
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      font-semibold
                      transition-all
                      duration-300
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </OpenCloseLayout>
  );
}