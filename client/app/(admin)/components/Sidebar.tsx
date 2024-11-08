import { PowerIcon } from "lucide-react";
import SidebarRoutes from "./Sidebar-routes";
import { ModeToggle } from "@/components/mode-toggle";

const SiderBar = () => {
  return (
    <aside className=' fixed left-0 w-[250px] border-r dark:border-neutral-600 min-h-screen flex flex-col gap-4 dark:bg-[#1d1e22] py-6 px-1 overflow-y-auto '>
      <SidebarRoutes />

      <div className='flex items-center justify-between px-6'>
        <ModeToggle />

        <form>
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
            <PowerIcon className='w-6' />
            <div className='hidden md:block'>Exit</div>
          </button>
        </form>
      </div>
    </aside>
  );
};

export default SiderBar;
