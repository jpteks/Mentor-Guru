import { Suspense } from "react";

import { CreateInvoice } from "@/app/(admin)/components/ui/invoices/buttons";
import Search from "@/components/ui/search";
import InvoicesTable from "@/app/(admin)/components/ui/invoices/table";
import { InvoicesTableSkeleton } from "@/app/(admin)/components/ui/skeletons";
import Pagination from "@/components/ui/pagination";

//import { fetchInvoicesPages } from "@/app/testpage/lib/data";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = /*(await fetchInvoicesPages(query)) || */ 10;
  return (
    <div className='w-full px-1 md:p-6'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`text-2xl`}>Users Plan</h1>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search invoices...' />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
