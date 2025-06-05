import Joi from "joi";

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();

export const signInSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: emailSchema,
  password: passwordSchema,
});