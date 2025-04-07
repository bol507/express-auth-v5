 import * as z from "zod";

 export const SignInSchema = z.object({
   email: z.string().email({
    message: "Invalid email",
    }),
   password: z.string().min(1,{
     message: "Password is required",
   }),
 });

 export const SignUpSchema = z.object({
   email: z.string().email({
    message: "Invalid email",
    }),
   password: z.string().min(8,{
     message: "Password is required",
   }),
   name: z.string().min(1,{
     message: "Name is required",
   }),
 });

 export type SignInSchemaType = z.infer<typeof SignInSchema>;
 export type SignUpSchemaType = z.infer<typeof SignUpSchema>;