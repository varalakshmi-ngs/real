import React, { useState } from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { useForm } from "react-hook-form";
import { addMemberValidation } from "../../../../validations/HomePageValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../utils/CustomInput";
import ImageEditContainer from "../../../../utils/ImageEditContainer";
import FormBtn from "../../../../utils/FormBtn";
import { X } from "lucide-react";

import { apiRequest } from "../../../../services/ApiCalls";
import { APIURL } from "../../../../Core/url";

export default function VideosSection({ data, refreshData }) {
  const [action, setAction] = useState("add");
  const [imageFile, setImageFile] = useState(null);

  console.log(data);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(addMemberValidation),
  });

  const [modalOpen, setModalOpen] = useState({
    action: null,
    open: false,
    id: null,
  });

  const handleCloseModal = () => {
    setModalOpen({
      action: null,
      open: false,
      id: null,
    });
  };

  const deleteVideo = async (id) => {
    const data = await apiRequest({
      method: "delete",
      url: `/home/deletevideo/${id}`,
    });

    if (data.success) {
      //refresh data
      refreshData();
    }
  };

  const submitForm = async (formdata) => {
    console.log(formdata);

    const formDataToSend = new FormData();

    // Correctly loop through key-value pairs
    Object.entries(formdata).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    console.log(formDataToSend);

    const data = await apiRequest({
      method: "post",
      url: "/home/addvideo",
      data: formDataToSend,
    });

    console.log(data);

    if (data.success) {
      handleCloseModal();
      refreshData();
    }
  };

  return (
    <OpenCloseLayout title="Video's Section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((e) => {
          return <VideoWithBtn video={e} onClick={() => deleteVideo(e.id || e._id)} />;
        })}
      </div>

      {modalOpen.open && (
        <div className="fixed top-0 left-0 h-[100vh] w-[100vw] overflow-y-scroll bg-slate-100/90 flex items-center justify-center p-4">
          <form
            className="bg-white text-slate-900 p-4 h-[80%] overflow-y-auto rounded-xl space-y-4 w-full max-w-2xl border border-slate-200 shadow-lg"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-primary font-bold">
                {modalOpen.action?.toUpperCase()}
              </h2>
              <button type="button" onClick={handleCloseModal}>
                <X />
              </button>
            </div>

            <CustomInput
              label={"Youtube Link"}
              name={"youtubeLink"}
              register={register}
              error={errors.youtubeLink}
            />
            <CustomInput
              label={"Speaker Name"}
              name={"speakerName"}
              register={register}
              error={errors.speakerName}
            />
            <CustomInput
              label={"Description"}
              name={"description"}
              register={register}
              error={errors.desc}
            />
            <CustomInput
              label={"Sub Text"}
              name={"subText"}
              register={register}
              error={errors.speakerName}
            />

            <ImageEditContainer
              // existingImage={backendData.imageUrl}
              onImageChange={setImageFile}
            />

            <FormBtn type="submit" title="Save" />
          </form>
        </div>
      )}
      <div className="flex justify-end">
        <FormBtn
          style={"self-end"}
          type="button"
          onClick={() => setModalOpen({ action: "add", open: true })}
          title="Add New"
        />
      </div>
    </OpenCloseLayout>
  );
}

import { Trash2 } from "lucide-react"; // import delete icon

function VideoWithBtn({ video, onClick }) {
  return (
    <div className="relative bg-white shadow-sm rounded-xl overflow-hidden transition-transform transform hover:scale-105 border border-slate-200">
      {/* Delete Button */}
      <button
        onClick={onClick}
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>

      {/* Thumbnail */}
      <div className="aspect-video w-full bg-gray-200">
        <img
          src={`${APIURL}/${video.thumbnailImage}`}
          alt="Thumbnail"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-lg font-semibold text-gray-800">
          {video?.speakerName}
        </p>
        <p className="text-sm text-gray-600">{video?.description}</p>
        <a
          href={video?.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
