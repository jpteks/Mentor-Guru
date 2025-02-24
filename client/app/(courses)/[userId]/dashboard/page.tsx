import { auth } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div>
      <div>Dashboard</div>
      <div>{JSON.stringify(session?.user, null, 2)} </div>
    </div>
  );
};

export default DashboardPage;
