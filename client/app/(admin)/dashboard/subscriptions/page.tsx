import { Suspense } from "react";

import Search from "@/components/ui/search";

import { InvoicesTableSkeleton } from "@/app/(admin)/components/ui/skeletons";
import Pagination from "@/components/ui/pagination";
import { CreateInvoice } from "../../components/ui/subscribers/buttons";
import SubscriberTable from "../../components/ui/subscribers/table";
import { cookies } from "next/headers";
import { backend_url } from "@/app/constant";
import { subscribersType } from "@/types/subscription";

async function getData(currentPage: number, query: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;

  try {
    const res = await fetch(`${backend_url}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
      body: JSON.stringify({ offset: currentPage, query }),
    });

    if (!res.ok) {
      console.error("Failed to fetch data", await res.text());
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching subscription:", error);
    return [];
  }
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const {
    subscribers: s,
    totalPages: t,
    //totalSubscribers,
  } = await getData(currentPage, query);
  const subscribers: subscribersType[] = s;
  const totalPages = t || 1;

  return (
    <div className='w-full px-1 md:p-6'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`text-2xl`}>Users Plan</h1>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search users...' />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <SubscriberTable subscribers={subscribers} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
