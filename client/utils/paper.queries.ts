import { Paper } from "@/models/paper.model";

type paperType = { name: string; category: string; url: string };

export async function createPaper(paper: paperType) {
  try {
    const paperDB = new Paper(paper);
    await paperDB.save()
    return paperDB;
  } catch (error) {
    console.log("paper not saved",error);
  }
}
