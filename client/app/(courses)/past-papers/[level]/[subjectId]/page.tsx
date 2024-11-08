import Table from "@/app/(courses)/components/table";

import { Suspense } from "react";

export default async function page({
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
      <Suspense fallback={<div>Loading..</div>}>
        <Table name={subjectId} level={level} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
