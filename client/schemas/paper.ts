import { z } from "zod";

export const paperSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(4, "Name should have atleast 4 characters"),
  category: z
    .string({ message: "Category is required" })
    .min(4, "Category should have atleast 4 characters"),
  url: z.string({ message: "url is required" }).url("Link must be a validURL."),
  paper: z
    .string({ message: "Paper is required" })
    .min(1, { message: "paper must not be empty" }),
  year: z
    .string({ message: "Year is required" })
    .min(2, { message: "year must not be empty" }),
});
