import { verifyTokenAction } from "@/actions/verifyTokenAction";
import AvatarBtnContent from "./profileAvatar-content";
import { cookies } from "next/headers";
import { authPayload } from "@/utils/verifyToken";
import { backend_url } from "@/app/constant";
import { usersType } from "@/types/user";

async function getData(): Promise<usersType> {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;

  const payload = token && ((await verifyTokenAction(token)) as authPayload);
  const userId = (payload && payload?.id) as string;
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

const AvatarBtn = async () => {
  const data: usersType = await getData();

  return (
    <div>
      <AvatarBtnContent data={data} />
    </div>
  );
};

export default AvatarBtn;
