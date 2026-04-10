import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChruchServices } from "../../../validations/HomePageValidations";
import {
  addServiceApi,
  deleteServiceApi,
  getServiceApi,
  updateServiceApi,
} from "../services/meeting.service";

export default function UsehomepageChruchServicehook(initial = []) {
  const [scheduleData, setScheduleData] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ChruchServices),
    defaultValues: {
      day: "",
      department: "",
      service1: "",
      service2: "",
      service3: "",
    },
  });

  const submitForm = async (data) => {
    console.log("selectedIndex", selectedIndex);

    if (selectedIndex) {
      const apiData = await updateServiceApi({ data, id: selectedIndex });
      if (apiData.status) fetchService();
    } else {
      const apiData = await addServiceApi({ data });
      if (apiData.status) {
        setScheduleData((prev) => [...prev, apiData.data?.savedService]);
      }
    }

    reset();
    setSelectedIndex(null);
    setModalOpen(false);
  };

  const deleteEntry = async (id) => {
    const apiRes = await deleteServiceApi({ id });
    if (apiRes.status) fetchService();
  };

  // for edit
  const openModal = (index = null) => {
    setSelectedIndex(index?._id);
    if (index !== null) {
      reset(index);
    } else {
      reset({
        day: "",
        department: "",
        service1: "",
        service2: "",
        service3: "",
      });
    }
    setModalOpen(true);
  };

  // close modal
  const closeModal = () => {
    console.log("❌ closeModal");
    setModalOpen(false);
    setSelectedIndex(null);
    reset();
  };

  const fetchService = async () => {
    const apiData = await getServiceApi();
    if (apiData.status) setScheduleData(apiData?.data?.services);
  };

  useEffect(() => {
    fetchService();
  }, []);

  return {
    register,
    submitForm,
    deleteEntry,
    handleSubmit,
    scheduleData,
    modalOpen,
    selectedIndex,
    errors,
    reset,
    openModal,
    closeModal,
    setScheduleData,
  };
}
