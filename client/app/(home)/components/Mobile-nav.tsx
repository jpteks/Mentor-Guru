"use client";
import { ModeToggle } from "@/components/mode-toggle";

import { Menu } from "./menu";
import Image from "next/image";

const MobileNav = () => {
  return (
    <div>
      <div className='bg-transparent border-b dark:border-neutral-600  px-4 flex justify-between gap-8 items-center h-[10vh] md:hidden z-[100] '>
        <div className='rounded-full p-2 w-14 h-14'>
          <Image
            src={
              "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYCsudO05EwIl5vQdWOGxmz6pU9Tu1SJHobh03"
            }
            alt='logo'
            width={60}
            height={60}
          />
        </div>

        <div className='flex flex-row-reverse items-center justify-between w-1/2 border rounded-full p-1 '>
          <Menu />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
