//import { fetchFilteredInvoices } from "../../lib/data";
import { subscribersType } from "@/types/subscription";
import { UpdateInvoice, DeleteInvoice } from "./buttons";
import PlanStatus from "./status";
import { formatDateToLocal } from "@/lib/utils";

export default async function SubscriberTable({
  subscribers,
}: {
  subscribers: subscribersType[];
}) {
  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 dark:bg-inherit dark:border p-2 md:pt-0'>
          {/* <div className='md:hidden'>
            {subscribers &&
              subscribers.length > 0 &&
              subscribers?.map(subscriber => (
                <div
                  key={subscriber._id}
                  className='mb-2 w-full rounded-md bg-white dark:bg-inherit p-4'
                >
                  <div className='flex items-center justify-between border-b pb-4'>
                    <div>
                      <div className='mb-2 flex items-center'>
                        <p>{subscriber.user.username}</p>
                      </div>
                      <p className='text-sm text-gray-500'>
                        {subscriber.user.email}
                      </p>
                    </div>
                    <PlanStatus status={subscriber.plan.packageName} />
                  </div>
                  <div className='flex w-full items-center justify-between pt-4'>
                    <div>
                      <p className='text-xl font-medium'>
                        {subscriber.payment.amount}
                      </p>
                      <p>{formatDateToLocal(subscriber.payment.paymentDate)}</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <UpdateInvoice id={subscriber._id} />
                      <DeleteInvoice id={subscriber._id} />
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
          <table className='hidden min-w-full text-gray-900 dark:text-white md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  User
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Email
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Phone No
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Amount
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Method
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Plan
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-inherit dark:text-white'>
              {subscribers &&
                subscribers.length > 0 &&
                subscribers?.map(subscriber => (
                  <tr
                    key={subscriber._id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <p>{subscriber.user?.username}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {subscriber.user?.email}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {subscriber.user?.phoneNumber}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {subscriber.payment?.amount}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {subscriber.payment?.paymentMethod}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatDateToLocal(subscriber.payment?.paymentDate)}
                    </td>

                    <td className='whitespace-nowrap px-3 py-3'>
                      <PlanStatus status={subscriber.plan?.packageName} />
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-end gap-3'>
                        <UpdateInvoice id={subscriber?._id} />
                        <DeleteInvoice id={subscriber?._id} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
