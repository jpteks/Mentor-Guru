import { RefreshCw } from "lucide-react";
//import { LatestInvoice } from "../../lib/definitions";
import clsx from "clsx";
import Image from "next/image";

const latestInvoices = [
  {
    id: "1",
    name: "Alex Smith",
    image_url: "/avatars/01.png",
    email: "XXXXXXXXXXXXXXX",
    amount: "$250.00",
  },
  {
    id: "2",
    name: "Jose Garcia",
    image_url: "/avatars/02.png",
    email: "jose@example.com",
    amount: "$150.00",
  },
  {
    id: "3",
    name: "Adam Smith",
    image_url: "/avatars/03.png",
    email: "XXXXXXXXXXXXXX",
    amount: "$350.00",
  },
  {
    id: "4",
    name: "Payal Dias",
    image_url: "/avatars/04.png",
    email: "payal@example.com",
    amount: "$450.00",
  },
  {
    id: "5",
    name: "John Garcia",
    image_url: "/avatars/05.png",
    email: "john@example.com",
    amount: "$550.00",
  },
];

export default async function LatestInvoices() {
  return (
    <div className='flex w-full flex-col md:col-span-4'>
      <h2 className={`mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 dark:bg-slate-900 p-4'>
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className='bg-white dark:bg-slate-800 px-6'>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4 dark:border-slate-400",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className='flex items-center'>
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className='mr-4 rounded-full'
                    width={32}
                    height={32}
                  />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold md:text-base'>
                      {invoice.name}
                    </p>
                    <p className='hidden text-sm text-gray-500 sm:block'>
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className={`truncate text-sm font-medium md:text-base`}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <RefreshCw className='h-5 w-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500 '>Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
