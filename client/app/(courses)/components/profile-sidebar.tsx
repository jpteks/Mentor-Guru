import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileItems from "./profileItems";

const ProfilePageSidebar = () => {
  const routes = [
    { href: "/userid/profile", label: "Account" },
    // { href: "/userid/profile/password", label: "Password" },
    { href: "/userid/profile/plan", label: "Plan" },
  ];
  return (
    <div className='flex flex-col h-full'>
      <div>
        <div className='grid place-items-center gap-2 p-3'>
          <Avatar className='mt-4 w-24 h-24 border'>
            <AvatarImage src='https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvY0HIWELvZowzOpsYWD1jXQ3evFdluRHbPTtNa' />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <p className='font-bold text-slate-800 dark:text-white'>Steve jobs</p>
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
