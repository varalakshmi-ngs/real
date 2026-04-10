import Joi from "joi";

export const testimonialValidator = (data) => {
  const schema = Joi.object({
    image: Joi.string().required().messages({
      "string.empty": "Image URL is required",
      "string.uri": "Image must be a valid URL",
    }),

    name: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be less than or equal to 50 characters",
    }),

    comment: Joi.string().min(5).max(500).required().messages({
      "string.empty": "Comment is required",
      "string.min": "Comment must be at least 5 characters",
      "string.max": "Comment must be less than or equal to 500 characters",
    }),
  });

  return schema.validate(data);
};
