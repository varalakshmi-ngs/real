import { useForm } from "react-hook-form";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import CustomInput from "../../../../utils/CustomInput";
import FormBtn from "../../../../utils/FormBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinWeekendValidation } from "../../../../validations/HomePageValidations";
import { Trash2 } from "lucide-react";
import { apiRequest } from "../../../../services/ApiCalls";

export default function JoinWeekend({ data, refreshData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(joinWeekendValidation),
  });

  const submitForm = async (formData) => {
    const data = await apiRequest({
      method: "post",
      url: `/home/addweekendprogram`,
      data: formData,
    });

    if (data) {
      refreshData();
    }
  };

  const handleDeleteWeekendCard = async (id) => {
    const resp = await apiRequest({
      method: "delete",
      url: `/home/deleteweekendprogram/${id}`,
    });

    console.log(resp);

    if (resp.success) {
      refreshData();
    }
  };

  return (
    <OpenCloseLayout title="Join Us Weekend">
      {data?.map((item, index) => {
        return (
          <JoinWeekendCard
            onDelete={() => handleDeleteWeekendCard(item._id)}
            item={item}
            key={index}
          />
        );
      })}

      {data?.length < 2 && (
        <form onSubmit={handleSubmit(submitForm)}>
          <h2 className="my-2 font-bold text-2xl font-primary">
            Add a Weekend Program
          </h2>

          <div className="grid grid-cols-2 gap-3 ">
            <CustomInput
              register={register}
              name="title"
              label="Box Title"
              placeholder="Capture Moments, Create Memories"
              error={errors.title}
            />
            <CustomInput
              register={register}
              name="subText"
              label="Host Name"
              placeholder="Micheal John Son"
              error={errors.subText}
            />
            <CustomInput
              register={register}
              name="buttonText"
              label="Button Text"
              placeholder="Youtube Link"
              error={errors.buttonText}
            />
            <CustomInput
              register={register}
              name="youtubeLink"
              label="Youtube Link"
              placeholder="Micheal John Son"
              error={errors.youtubeLink}
            />
            <CustomInput
              register={register}
              name="date"
              label="Date"
              placeholder="08 - Oct - 2025"
              type="date"
              error={errors.date}
            />
            <CustomInput
              register={register}
              name="time"
              label="Time"
              placeholder="08:00 AM"
              type="time"
              error={errors.time}
            />
            <CustomInput
              register={register}
              name="location"
              label="Location"
              placeholder="Postal Address : PO Box 16122 Collins Street, Victoria 8007 Australia"
              error={errors.location}
            />
          </div>
          <FormBtn type="submit" icon={null} style={"w-fit m-3 flex-end"} />
        </form>
      )}
    </OpenCloseLayout>
  );
}

function JoinWeekendCard({ item, onDelete }) {
  return (
    <div className="w-full bg-gray-300 rounded-xl shadow-md p-6 relative mb-6">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-4 right-4 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>

      {/* Title & SubText */}
      <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
      <p className="text-gray-600 mb-4">{item.subText}</p>

      {/* Date & Time */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
        <span className="font-medium">Date:</span>
        <span>{item.date}</span>
        <span className="font-medium">Time:</span>
        <span>{item.time}</span>
        <span className="font-medium">Location:</span>
        <span>{item.location}</span>
      </div>

      {/* YouTube Link */}
      <a
        href={item.youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-600 font-medium hover:underline mb-2"
      >
        Watch on YouTube
      </a>

      {/* Button Text */}
      <div className="mt-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
          {item.buttonText}
        </button>
      </div>
    </div>
  );
}
