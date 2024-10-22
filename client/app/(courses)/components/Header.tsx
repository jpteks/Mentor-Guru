import { ModeToggle } from "@/components/mode-toggle";

import { GraduationCap, Menu, Search } from "lucide-react";
import Notifications from "./notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <div className='border-b dark:border-neutral-600  px-4 flex z-10 justify-between gap-4 items-center h-[10vh] '>
      <h3 className='hidden md:flex text-orange-600 items-center justify-start font-black text-4xl'>
        Courses
      </h3>

      <Link href='/'>
        <h3 className='font-black text-4xl block md:hidden'>
          <GraduationCap />
        </h3>
      </Link>

      <div className='w-full hidden md:flex justify-center '>
        <div className='flex p-1 items-center justify-center gap-2 py-3 px-3 rounded-full  border'>
          <Search size={16} />
          <input
            type='search'
            placeholder='find a course...'
            className='bg-transparent outline-none text-xs'
          />
        </div>
      </div>

      <div className='flex flex-row-reverse items-center justify-between w-1/2 md:w-1/4 '>
        <div className='flex justify-center items-center gap-2 border rounded-full p-1'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <ModeToggle />

          <Notifications />

          <Menu className='flex md:hidden' />
        </div>
      </div>
    </div>
  );
};

export default Header;