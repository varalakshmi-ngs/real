import { Contact, PrayerRequest, Testimonial } from "../models.js";

export const createContact = async ({
  firstName,
  email,
  mobile,
  subject,
  message,
}) => {
  const savedContact = await Contact.create({
    firstName,
    email,
    mobile,
    subject,
    message,
  });
  return savedContact;
};

export const createTestimonial = async ({ name, comment, image }) => {
  const saved = await Testimonial.create({
    name,
    comment,
    image,
  });
  return saved;
};

export const createPrayerRequest = async (data) => {
  return await PrayerRequest.create(data);
};
