import { LogOut, GraduationCap } from "lucide-react";
import Link from "next/link";
import SidebarRoutes from "./Sidebar-routes";

const SiderBar = () => {
  return (
    <aside className=' fixed left-0 w-[250px] border-r dark:border-neutral-600 min-h-screen flex flex-col gap-4 dark:bg-[#1d1e22] p-6 overflow-y-auto '>
      <div className='border-b dark:border-neutral-600'>
        <Link href='/' className='flex  p-2 rounded-md text-lg font-bold'>
          <GraduationCap className='mr-2 ' />
          Mentor Guru
        </Link>
      </div>

      <SidebarRoutes />

      <div className='border-t dark:border-neutral-600 '>
        <a href='#' className='flex  p-2  items-center'>
          <LogOut className='mr-2 ' size={16} />
          Logout
        </a>
      </div>
    </aside>
  );
};

export default SiderBar;
