import { PaperTableSkeleton } from "@/app/(courses)/components/skeletonns";
import Table from "@/app/(courses)/components/table";

import { Suspense } from "react";

export default async function SubjectTable({
  params,
  searchParams,
}: {
  params: { subjectId: string; level: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const subjectId = params.subjectId;
  const level = params.level;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className='p-4'>
      <Suspense
        key={subjectId + level + currentPage}
        fallback={<PaperTableSkeleton />}
      >
        <Table name={subjectId} level={level} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
