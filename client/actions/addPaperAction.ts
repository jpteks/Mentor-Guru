"use server";

import { paperSchema } from "@/schemas/paper";
import { paperFormState, StringMap } from "@/types/paper";
import { convertZodErrors } from "@/utils/errors";

export async function addPaperAction(
  prevState: paperFormState<StringMap>,
  formData: FormData
): Promise<paperFormState<StringMap>> {
  const unvalidatedData = {
    name: formData.get("name"),
    category: formData.get("category"),
    url: formData.get("url"),
  };

  const validatedData = paperSchema.safeParse(unvalidatedData);

  if (!validatedData.success) {
    console.log(validatedData.error);
    const errors = convertZodErrors(validatedData.error);
    return { errors };
  }

  return { successMsg: "Paper added successfully" };
}
