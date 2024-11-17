import { ModeToggle } from "@/components/mode-toggle";

import { GraduationCap } from "lucide-react";
import Notifications from "./notifications";
import Link from "next/link";
import { Menu } from "@/app/(home)/components/menu";
import AvatarBtn from "./profileAvatar";
import Search from "./Search";
import { Suspense } from "react";

const Header = () => {
  return (
    <div className='border-b  dark:border-neutral-600  px-4 flex z-10 justify-between gap-4 items-center h-[10vh] '>
      <h3 className='hidden lg:flex text-orange-600 items-center justify-start font-black text-4xl'>
        Courses
      </h3>

      <Link href='/'>
        <h3 className='font-black text-4xl block lg:hidden'>
          <GraduationCap />
        </h3>
      </Link>

      <div className='w-full hidden lg:flex justify-center '>
        <Suspense fallback={<div>Loading ....</div>}>
          <Search placeholder='search course...' />
        </Suspense>
      </div>

      <div className='flex  items-center justify-end w-1/2 md:w-1/4 '>
        <div className='flex justify-center flex-row-reverse items-center gap-2 border rounded-full p-1'>
          <Suspense fallback={<div>Loading ....</div>}>
            <AvatarBtn />
          </Suspense>

          <Suspense fallback={<div>Loading ....</div>}>
            <ModeToggle />
          </Suspense>

          <Suspense fallback={<div>Loading ....</div>}>
            <Notifications />
          </Suspense>

          <div className='md:hidden block'>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
