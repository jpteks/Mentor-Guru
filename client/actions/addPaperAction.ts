"use server";

import { dbConnect } from "@/lib/mongo.connection";
import { paperSchema } from "@/schemas/paper";
import { paperFormState, StringMap } from "@/types/paper";
import { convertZodErrors } from "@/utils/errors";
import { createPaper } from "@/utils/paper.queries";

export async function addPaperAction(
  prevState: paperFormState<StringMap>,
  formData: FormData
): Promise<paperFormState<StringMap>> {
  const unvalidatedData = {
    name: formData.get("name") ?? "",
    category: formData.get("category") ?? "",
    url: formData.get("url") ?? "",
    paper: formData.get("paper") ?? "",
    year: formData.get("year") ?? "",
  };

  const validatedData = paperSchema.safeParse(unvalidatedData);

  if (!validatedData.success) {
    console.error(validatedData.error);
    const errors = convertZodErrors(validatedData.error);
    return { ...prevState, errors };
  } else {
    await dbConnect();
    await createPaper(validatedData.data);
    return { successMsg: "Paper added successfully" };
  }
}
