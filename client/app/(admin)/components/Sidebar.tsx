import { LogOut, GraduationCap } from "lucide-react";
import Link from "next/link";
import SidebarRoutes from "./Sidebar-routes";
import { ModeToggle } from "@/components/mode-toggle";

const SiderBar = () => {
  return (
    <aside className=' fixed left-0 w-[250px] border-r dark:border-neutral-600 min-h-screen flex flex-col gap-4 dark:bg-[#1d1e22] p-6 overflow-y-auto '>
      <SidebarRoutes />

      <div className='flex justify-between'>
        <ModeToggle />
        <Link
          href='/'
          className='flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700'
        >
          <LogOut className='w-5 h-5' />
          Exit
        </Link>
      </div>
    </aside>
  );
};

export default SiderBar;
