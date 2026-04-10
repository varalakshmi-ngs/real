import Joi from "joi";

export const contactValidator = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name must be less than or equal to 50 characters",
    }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email is required",
      }),

    mobile: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": "Mobile number is required",
        "string.pattern.base": "Mobile must be a valid 10-digit Indian number",
      }),

    subject: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Subject is required",
      "string.min": "Subject must be at least 3 characters",
    }),

    message: Joi.string().min(5).max(1000).required().messages({
      "string.empty": "Message is required",
      "string.min": "Message must be at least 5 characters",
    }),
  });

  return schema.validate(data);
};
