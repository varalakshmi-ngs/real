import Joi from "joi";

export const validatePrayerRequest = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    forWhom: Joi.string().min(2).max(50).required(),
    prayerType: Joi.string()
      .valid(
        "Job",
        "Family",
        "Exams",
        "Marriage",
        "Business",
        "Spiritual",
        "Children",
        "Emergency",
        "Health",
        "Finance"
      )
      .required(),
    language: Joi.string().min(2).max(30).required(),
    city: Joi.string().min(2).max(50).required(),
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Mobile must be a 10-digit number",
      }),
    message: Joi.string().min(5).max(500).required(),
  });

  return schema.validate(data);
};
