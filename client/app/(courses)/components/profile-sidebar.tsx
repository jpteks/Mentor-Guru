//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileItems from "./profileItems";
//import { useParams } from "next/navigation";
import UserAvatar from "./avatarUplaod";
import { cookies } from "next/headers";
import { backend_url } from "@/app/constant";
import { usersType } from "@/types/user";

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

const ProfilePageSidebar = async ({ userId }: { userId: string }) => {
  //const params = useParams<{ userId: string }>();

  const routes = [
    { href: `/${userId}/profile`, label: "Account" },
    // { href: "/userid/profile/password", label: "Password" },
    { href: `/${userId}/profile/plan`, label: "Plan" },
  ];

  const data: usersType = await getData(userId);


  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-3'>
        <div className='grid place-items-center gap-2 p-3'>
          <UserAvatar avatarUrl={data.avatarUrl} />
          <p className='font-bold text-slate-800 dark:text-white'>
            {data.username}
          </p>
        </div>
        <div className='flex md:flex-col'>
          {routes.map(route => (
            <ProfileItems
              key={route.href}
              href={route.href}
              label={route.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSidebar;
