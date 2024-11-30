import Link from "next/link";
import SidebarRoutes from "./Sidebar-routes";
import Image from "next/image";
import UpgradeCard from "./upgrade-card";

const SiderBar = () => {
  return (
    <aside className=' fixed left-0 w-[250px] border-r dark:border-neutral-600 min-h-screen flex flex-col gap-4 dark:bg-[#1d1e22] p-6 overflow-y-auto '>
      <div className='border-b dark:border-neutral-600'>
        <Link
          href='/'
          className='flex  p-2 rounded-md text-lg font-bold items-center justify-center'
        >
          <Image
            src={
              "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYCsudO05EwIl5vQdWOGxmz6pU9Tu1SJHobh03"
            }
            alt='logo'
            width={30}
            height={30}
          />
          Mentor Guru
        </Link>
      </div>

      <SidebarRoutes />
      <UpgradeCard />
    </aside>
  );
};

export default SiderBar;
