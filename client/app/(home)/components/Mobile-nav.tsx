"use client";
import { ModeToggle } from "@/components/mode-toggle";

import { Menu } from "./menu";

const MobileNav = () => {
  return (
    <div>
      <div className='bg-transparent border-b dark:border-neutral-600  px-4 flex justify-between gap-8 items-center h-[10vh] md:hidden z-[100] '>
        <h1 className='font-bold font-mono text-xl'>Mentor Guru</h1>
        
        <div className='flex flex-row-reverse items-center justify-between w-1/2 border rounded-full p-1 '>
          <Menu />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
