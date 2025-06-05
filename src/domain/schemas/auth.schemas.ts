import Joi from "joi";

const emailSchema = Joi
  .string()
  .email()
  .required();
  
const passwordSchema = Joi
  .string()
  .min(8)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
  .message('Password must be at least 8 characters and contain uppercase, lowercase, number, and special character')
  .required();

export const signInSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: emailSchema,
  password: passwordSchema,
});