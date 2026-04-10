import { z } from "zod";
import {
  basic15CharText,
  basic3CharText,
  basic5CharText,
  basicUrl,
} from "./schema";

export const heroSectionValidation = z.object({
  title: basic3CharText,
  subText: basic5CharText,
  buttonText: basic3CharText,
  buttonLink: basic3CharText,
});

export const pastorIntro = z.object({
  pasterName: basic3CharText,
  description: basic15CharText,
  // title: basic5CharText,
});

export const addMemberValidation = z.object({
  youtubeLink: basicUrl,
  speakerName: basic3CharText,
  description: basic15CharText,
  subText: basic3CharText,
});

export const joinWeekendValidation = z.object({
  title: basic3CharText,
  subText: basic5CharText,
  buttonText: basic3CharText,
  youtubeLink: basicUrl,
  date: basic3CharText,
  time: basic3CharText,
  location: basic5CharText,
});
export const ChruchServices = z.object({
  day: z.string().min(1, "Day is required"),
  department: basic3CharText,
  service1: basic5CharText,
  service2: z.string().optional(),
});
export const LastMessageValidation = z.object({
  heading: basic3CharText,
  description: basic15CharText,
  hostName: basic3CharText,
  title: basic5CharText,
  youtubeLink: basicUrl,
});

export const GalleryValidation = z.object({
  categoryName: basic5CharText,
});

export const blogValidation = (isEdit = false) =>
  z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
    location: z.string().min(1, "Location is required"),
    image: isEdit
      ? z.any().optional()
      : z.any().refine((file) => file && file.length > 0, "Image is required"),
  });

export const eventValidation = (isEdit = false) =>
  z.object({
    eventName: z.string().min(1, "Event Name is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().min(1, "Description is required"),
    eventType: z.string().min(1, "Event Type is required"),
    startTime: z.string().min(1, "Start Time is required"),
    endTime: z.string().min(1, "End Time is required"),
    location: z.string().min(1, "Location is required"),
    image: isEdit
      ? z.any().optional()
      : z.any().refine((file) => file && file.length > 0, "Image is required"),
  });
