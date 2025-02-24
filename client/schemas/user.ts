import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(9, {
    message: "phone number must be at least 9 characters.",
  }),
  region: z.string().min(3, {
    message: "region must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  terms: z.boolean().refine(v => v, { message: "Accept terms and conditions" }),
  email: z.string().email({ message: "Email should be valid" }),
  role: z.enum(["student", "admin", "tutor"]),
});
