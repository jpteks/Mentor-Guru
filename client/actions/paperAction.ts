"use server";

import { dbConnect } from "@/lib/mongo.connection";
import { paperSchema } from "@/schemas/paper";
import { paperFormState, StringMap } from "@/types/paper";
import { convertZodErrors } from "@/utils/errors";
import { createPaper, getPapers } from "@/utils/paper.queries";

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
const ITEMS_PER_PAGE = 8;
export async function getPaperAction(
  currentPage: number,
  name: string,
  category: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  await dbConnect();
  const papers = await getPapers(offset, ITEMS_PER_PAGE, name, category);
  if (!papers) {
    return { errors: { name: "Papers not found" } };
  }
  return { papers: papers.papers, totalPages: papers.totalPages };
}
