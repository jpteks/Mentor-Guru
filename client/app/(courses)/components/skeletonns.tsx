import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className='flex p-4'>
        <div className='h-5 w-5 rounded-md bg-gray-200' />
        <div className='ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium' />
      </div>
      <div className='flex items-center justify-center truncate rounded-xl bg-white px-4 py-8'>
        <div className='h-7 w-20 rounded-md bg-gray-200' />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function LevelCardSkeleton() {
  return (
    <Skeleton className='flex flex-col items-center space-y-3 h-[400px] p-6'>
      <Skeleton className=' rounded-full w-[330px] h-[330px] ' />

      <Skeleton className='h-10 w-full' />
    </Skeleton>
  );
}

export function LevelWrapperSkeleton() {
  return (
    <div className='max-w-[900px] mx-auto gap-3 grid md:grid-cols-2 py-4 px-3'>
      <LevelCardSkeleton />
      <LevelCardSkeleton />
    </div>
  );
}



export function SubjectCardSkeleton() {
  return (
    <Card className={`${shimmer} relative w-full overflow-hidden border p-3 `}>
      <CardHeader>
        <CardTitle>
          <div className='mx-auto h-4 w-20 rounded-md bg-gray-200' />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export function SubjectWrapperSkeleton() {
  return (
    <div className='grid md:grid-cols-3 p-3 lg:grid-cols-4 gap-3 '>
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className='w-full border-b border-gray-100 dark:bg-gray-600 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
      {/* Email */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-32 rounded bg-gray-100 dark:bg-gray-400'></div>
      </td>
      {/* Amount */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-52 rounded bg-gray-100 dark:bg-gray-400'></div>
      </td>
      {/* Date */}
      <td className='whitespace-nowrap px-3 py-3 flex gap-2'>
        <div className='h-6 w-16 rounded bg-gray-100 dark:bg-gray-400'></div>
        <div className='h-6 w-16 rounded bg-gray-100 dark:bg-gray-400'></div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className='mb-2 w-full rounded-md bg-white p-4'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-8'>
        <div className='flex items-center'>
          <div className='mr-2 h-8 w-8 rounded-full bg-gray-100'></div>
          <div className='h-6 w-16 rounded bg-gray-100'></div>
        </div>
        <div className='h-6 w-16 rounded bg-gray-100'></div>
      </div>
      <div className='flex w-full items-center justify-between pt-4'>
        <div>
          <div className='h-6 w-16 rounded bg-gray-100'></div>
          <div className='mt-2 h-6 w-24 rounded bg-gray-100'></div>
        </div>
        <div className='flex justify-end gap-2'>
          <div className='h-10 w-10 rounded bg-gray-100'></div>
          <div className='h-10 w-10 rounded bg-gray-100'></div>
        </div>
      </div>
    </div>
  );
}

export function PaperTableSkeleton() {
  return (
    <div className={`relative  mt-6 flow-root`}>
      <div className={`${shimmer}  inline-block min-w-full align-middle`}>
        <div className='rounded-lg bg-gray-50 dark:bg-gray-500 p-2 md:pt-0'>
          <div className='md:hidden'>
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className={`hidden min-w-full text-gray-900 md:table`}>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  Paper
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Published Date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
