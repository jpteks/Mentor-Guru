import Search from "@/components/ui/search";
import { usersType } from "@/types/user";

export default async function UsersTable({ users }: { users: usersType[] }) {
  return (
    <div className='w-full'>
      <h1 className={`mb-8 text-xl md:text-2xl`}>users</h1>
      <Search placeholder='Search users...' />
      <div className='mt-6 flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                {users &&
                  users.length > 0 &&
                  users?.map(user => (
                    <div
                      key={user._id}
                      className='mb-2 w-full rounded-md bg-white p-4'
                    >
                      <div className='flex items-center justify-between border-b pb-4'>
                        <div>
                          <div className='mb-2 flex items-center'>
                            <div className='flex items-center gap-3'>
                              <p>{user.username}</p>
                            </div>
                          </div>
                          <p className='text-sm text-gray-500'>{user.email}</p>
                        </div>
                      </div>
                      <div className='flex w-full items-center justify-between border-b py-5'>
                        <div className='flex w-1/2 flex-col'>
                          <p className='text-xs'>Pending</p>
                          <p className='font-medium'>{user.password}</p>
                        </div>
                        <div className='flex w-1/2 flex-col'>
                          <p className='text-xs'>Paid</p>
                          <p className='font-medium'>{user.region}</p>
                        </div>
                      </div>
                      <div className='pt-4 text-sm'>
                        <p>{user.subscription} invoices</p>
                      </div>
                    </div>
                  ))}
              </div>
              <table className='hidden min-w-full rounded-md text-gray-900 md:table'>
                <thead className='rounded-md bg-gray-50 text-left text-sm font-normal'>
                  <tr>
                    <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                      Name
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Email
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Phone No
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      region
                    </th>
                    <th scope='col' className='px-4 py-5 font-medium'>
                      Plan
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-gray-900'>
                  {users &&
                    users.length > 0 &&
                    users.map(user => {
                      if (user.role == "adminu") return null;
                      return (
                        <tr key={user._id} className='group'>
                          <td className='whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                            <div className='flex items-center gap-3'>
                              <p>{user.username}</p>
                            </div>
                          </td>
                          <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                            {user.email}
                          </td>
                          <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                            {user.phoneNumber}
                          </td>
                          <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                            {user.region}
                          </td>
                          <td className='whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md'>
                            {user.plan?.packageName}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
