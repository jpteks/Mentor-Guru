"use client";
import PDFViewer from "@/app/(courses)/components/PDFViewer";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  
  return (
    <div>
      <PDFViewer pdfUrl={`https://utfs.io/f/${url}`} />
    </div>
  );
}
