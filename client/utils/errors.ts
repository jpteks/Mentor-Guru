import { StringMap } from "@/types/paper";
import { ZodError } from "zod";

export const convertZodErrors = (error: ZodError): StringMap => {
  return error.errors.reduce((acc, err) => {
    acc[err.path.join(".")] = err.message;
    return acc;
  }, {} as StringMap);
};
