"use server";

import { dbConnect } from "@/lib/mongo.connection";
import { paperSchema } from "@/schemas/paper";
import { paperFormState, StringMap } from "@/types/paper";
import { convertZodErrors } from "@/utils/errors";
import {
  createPaper,
  createPaperSolution,
  getPapers,
  getPapersSolution,
} from "@/utils/paper.queries";

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
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    await dbConnect();

    const result = await getPapers(offset, ITEMS_PER_PAGE, name, category);

    if ("error" in result) {
      return { error: result.error }; // Pass backend error to the frontend
    }

    if (!result.papers || result.papers.length === 0) {
      return { error: { statusCode: 404, message: "No papers found." } };
    }

    return { papers: result.papers, totalPages: result.totalPages };
  } catch (error) {
    console.error("Error in getPaperAction:", error);
    return {
      error: { statusCode: 500, message: "An unexpected error occurred." },
    };
  }
}

export async function addPaperSolutionAction(
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
    await createPaperSolution(validatedData.data);
    return { successMsg: "Paper added successfully" };
  }
}

export async function getPaperSolutionAction(
  currentPage: number,
  name: string,
  category: string
) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    await dbConnect();

    const result = await getPapersSolution(
      offset,
      ITEMS_PER_PAGE,
      name,
      category
    );

    if ("error" in result) {
      return { error: result.error }; // Pass backend error to the frontend
    }

    if (!result.papers || result.papers.length === 0) {
      return { error: { statusCode: 404, message: "No papers found." } };
    }

    return { papers: result.papers, totalPages: result.totalPages };
  } catch (error) {
    console.error("Error in getPaperAction:", error);
    return {
      error: { statusCode: 500, message: "An unexpected error occurred." },
    };
  }
}
