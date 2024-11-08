import CustomersTable from "@/app/(admin)/components/ui/customers/table";
import { CardSkeleton } from "@/app/(admin)/components/ui/skeletons";
import { Suspense } from "react";

const Customers = () => {
  const customers = [
    {
      id: "cust001",
      name: "John Doe",
      email: "johndoe@example.com",
      image_url: "https://i.pravatar.cc/150?img=3",
      total_invoices: 5,
      total_pending: "$1,200.00",
      total_paid: "$2,300.00",
    },
    {
      id: "cust002",
      name: "Jane Smith",
      email: "janesmith@example.com",
      image_url: "https://i.pravatar.cc/150?img=5",
      total_invoices: 3,
      total_pending: "$750.00",
      total_paid: "$1,500.00",
    },
    {
      id: "cust003",
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      image_url: "https://i.pravatar.cc/150?img=10",
      total_invoices: 7,
      total_pending: "$980.00",
      total_paid: "$4,700.00",
    },
    {
      id: "cust004",
      name: "Bob Brown",
      email: "bobbrown@example.com",
      image_url: "https://i.pravatar.cc/150?img=15",
      total_invoices: 4,
      total_pending: "$610.00",
      total_paid: "$2,800.00",
    },
  ];

  return (
    <div className='p-6'>
      <Suspense fallback={<CardSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
};

export default Customers;
