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

export async function getPapers(
  offset: number,
  ITEMS_PER_PAGE: number,
  name?: string,
  category?: string
) {
  try {
    // Dynamic filters with appropriate types
    const filters: Partial<Record<keyof typeof Paper.prototype, unknown>> = {};
    if (name) filters.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (category) filters.category = category;

    // Count documents with filters
    const totalPapers = await Paper.countDocuments(filters);
    const totalPages = Math.ceil(totalPapers / ITEMS_PER_PAGE);

    // Retrieve paginated documents
    const papers = await Paper.find(filters).skip(offset).limit(ITEMS_PER_PAGE);

    return { papers, totalPages };
  } catch (error) {
    console.error("Error fetching papers:", error);
    throw new Error("Failed to retrieve papers.");
  }
}
