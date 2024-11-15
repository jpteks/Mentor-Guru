import CardWrapper from "@/app/(admin)/components/ui/dashboard/cards";

import LatestInvoices from "@/app/(admin)/components/ui/dashboard/latest-invoices";
import RevenueChart from "@/app/(admin)/components/ui/dashboard/revenue-chart";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/(admin)/components/ui/skeletons";
import { backend_url } from "@/app/constant";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getSubscribers(currentPage: number, query: string) {
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
    console.error("An error occurred while fetching data:", error);
    return [];
  }
}

async function getUsers() {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;

  try {
    const res = await fetch(`${backend_url}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch data", await res.text());
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return [];
  }
}

export default async function Page() {
  const { totalSubscribers } = await getSubscribers(1, "");
  const {totalUsers} = await getUsers();
  return (
    <main className='p-6'>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper totalSubscribers={totalSubscribers} totalUsers={totalUsers} />
        </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
