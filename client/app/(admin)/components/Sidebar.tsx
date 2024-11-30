"use client";

import { PowerIcon } from "lucide-react";
import SidebarRoutes from "./Sidebar-routes";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SiderBar = () => {
  const router = useRouter();
  const handleClick = () => router.push("/courses");
  return (
    <aside className=' fixed left-0 w-[250px] border-r dark:border-neutral-600 min-h-screen flex flex-col gap-4 dark:bg-[#1d1e22] py-6 px-1 overflow-y-auto '>
      <div className='flex justify-center items-center  text-lg font-bold border-b p-2'>
        <Image
          src={
            "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYCsudO05EwIl5vQdWOGxmz6pU9Tu1SJHobh03"
          }
          alt='logo'
          width={30}
          height={30}
        />
        Mentor Guru
      </div>

      <SidebarRoutes />

      <div className='grid place-items-center grid-cols-2 px-6'>
        <ModeToggle />

        <Button
          onClick={handleClick}
          className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-1 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
        >
          <PowerIcon className='w-6' />
          <div className='hidden md:block'>Exit</div>
        </Button>
      </div>
    </aside>
  );
};

export default SiderBar;
