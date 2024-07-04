import Joi from "joi";

export const joiUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  univercity: Joi.string(),
  subject: Joi.string(),
});
