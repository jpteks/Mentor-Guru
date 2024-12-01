"use client";
import PDFViewer from "@/app/(courses)/components/PDFViewer";
import { useSearchParams } from "next/navigation";

export default function Preview() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";

  return (
    <div>
      <PDFViewer pdfUrl={`https://utfs.io/a/f3s5czn47t/${url}`} />
    </div>
  );
}
