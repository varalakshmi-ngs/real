import Joi from "joi";

export const signUpValidater = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),

    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
