import AccountForm from "./form";
import { getCachedUser } from "@/actions/userAction";



const Account = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
   const data = await getCachedUser(userId);

   console.log("users",data);
   

   if(!data) return null

  return <AccountForm data={data} />;
};

export default Account;
