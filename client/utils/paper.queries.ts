import { Paper } from "@/models/paper.model";

type paperType = { name: string; category: string; url: string };

export async function createPaper(paper: paperType) {
  try {
    const paperDB = await Paper.create(paper);
    return paperDB;
  } catch (error) {
    console.log(error);
  }
}
