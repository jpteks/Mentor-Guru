//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileItems from "./profileItems";
//import { useParams } from "next/navigation";
import UserAvatar from "./avatarUplaod";
import { usersType } from "@/types/user";
import { auth } from "@/auth";
import { getCachedUser } from "@/actions/userAction";

const ProfilePageSidebar = async ({ userId }: { userId: string }) => {
  //const params = useParams<{ userId: string }>();

  const routes = [
    { href: `/${userId}/profile`, label: "Account" },
    // { href: "/userid/profile/password", label: "Password" },
    //{ href: `/${userId}/profile/plan`, label: "Plan" },
  ];

  const data: usersType = await getCachedUser(userId);

  const session = await auth();

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-3'>
        <div className='grid place-items-center gap-2 p-3'>
          <UserAvatar
            avatarUrl={data.avatarUrl || (session?.user?.image as string)}
          />
          <p className='font-bold text-slate-800 dark:text-white'>
            {data.username || session?.user?.name}
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
