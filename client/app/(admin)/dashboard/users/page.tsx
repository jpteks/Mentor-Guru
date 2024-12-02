import { CardSkeleton } from "@/app/(admin)/components/ui/skeletons";
import { backend_url } from "@/app/constant";
import { cookies } from "next/headers";
import { Suspense } from "react";
import UsersTable from "../../components/ui/users/table";
import { backendApi } from "@/app/constant";
// async function getUsers() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("refreshToken")?.value;

//   try {
//     const response = await backendApi.get("/user", {
//       withCredentials: true,
//     });
//     // const res = await fetch(`${backend_url}/user`, {
//     //   method: "GET",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     //   cache: "no-cache",
//     // });

//     if (!res.ok) {
//       console.error("Failed to fetch data", await res.text());
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("An error occurred while fetching data:", error);
//     return [];
//   }
// }

// const Customers = async () => {
//   // const customers = [
//   //   {
//   //     id: "cust001",
//   //     name: "John Doe",
//   //     email: "johndoe@example.com",
//   //     image_url: "https://i.pravatar.cc/150?img=3",
//   //     total_invoices: 5,
//   //     total_pending: "$1,200.00",
//   //     total_paid: "$2,300.00",
//   //   },
//   //   {
//   //     id: "cust002",
//   //     name: "Jane Smith",
//   //     email: "janesmith@example.com",
//   //     image_url: "https://i.pravatar.cc/150?img=5",
//   //     total_invoices: 3,
//   //     total_pending: "$750.00",
//   //     total_paid: "$1,500.00",
//   //   },
//   //   {
//   //     id: "cust003",
//   //     name: "Alice Johnson",
//   //     email: "alicejohnson@example.com",
//   //     image_url: "https://i.pravatar.cc/150?img=10",
//   //     total_invoices: 7,
//   //     total_pending: "$980.00",
//   //     total_paid: "$4,700.00",
//   //   },
//   //   {
//   //     id: "cust004",
//   //     name: "Bob Brown",
//   //     email: "bobbrown@example.com",
//   //     image_url: "https://i.pravatar.cc/150?img=15",
//   //     total_invoices: 4,
//   //     total_pending: "$610.00",
//   //     total_paid: "$2,800.00",
//   //   },
//   // ];

//   const { users } = await getUsers();
 

//   return (
//     <div className='p-6'>
//       <Suspense fallback={<CardSkeleton />}>
//         <UsersTable users={users} />
//       </Suspense>
//     </div>
//   );
// };

// export default Customers;
async function getUsers() {
  try {
    const response = await backendApi.get("/user");
    return response.data; // Ensure your API returns the correct structure
  } catch (error) {
    console.error("An error occurred while fetching users:", error);
    return { users: [] }; // Fallback to an empty users list
  }
}

const Customers = async () => {
  const { users } = await getUsers();

  return (
    <div className="p-6">
      <Suspense fallback={<CardSkeleton />}>
        <UsersTable users={users} />
      </Suspense>
    </div>
  );
};

export default Customers;