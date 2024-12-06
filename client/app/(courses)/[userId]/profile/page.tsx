import { usersType } from "@/types/user";
import AccountForm from "./form";
import { backend_url } from "@/app/constant";
import { cookies } from "next/headers";

async function getData(userId: string): Promise<usersType> {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;
  try {
    const res = await fetch(`${backend_url}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch data [/profile]", await res.text());
      return {
        _id: "",
        email: "",
        password: "",
        phoneNumber: "",
        plan: {
          packageName: "",
        },
        region: "",
        role: "",
        subscription: "",
        username: "",
        bio: "",
        avatarUrl: "",
      };
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return {
      _id: "",
      email: "",
      password: "",
      phoneNumber: "",
      plan: {
        packageName: "",
      },
      region: "",
      role: "",
      subscription: "",
      username: "",
      bio: "",
      avatarUrl: "",
    };
  }
}

const Account = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const data: usersType = await getData(userId);

  return <AccountForm data={data} />;
};

export default Account;
