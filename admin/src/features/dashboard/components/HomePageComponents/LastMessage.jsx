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
  }, [data]);

  const submitForm = async (formdata) => {
    console.log(formdata);

    const formDataToSend = new FormData();

    // Correctly loop through key-value pairs
    Object.entries(formdata).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (ImageFile) {
      formDataToSend.append("image", ImageFile);
    }

    console.log(formDataToSend);

    const data = await apiRequest({
      method: "put",
      url: "/home/latestmessage",
      data: formDataToSend,
    });

    console.log(data);

    // reset();
  };

  return (
    <OpenCloseLayout title="Latest Message">
      <div className="flex gap-10 w-full">
        <div className="w-full">
          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <div className="flex gap-10 justify-center ">
              <div className="w-full ">
                {" "}
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

              <div className="w-full justify-center ">
                <ImageEditContainer
                  existingImage={`
                       ${APIURL}/${data?.thumbnailImage}
                     `}
                  onImageChange={setImageFile}
                />
                <FormBtn type="submit" icon={null} style="mt-4" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </OpenCloseLayout>
  );
}
