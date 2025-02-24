import { ModeToggle } from "@/components/mode-toggle";
import Notifications from "./notifications";
import Link from "next/link";
import { Menu } from "@/app/(home)/components/menu";
//import AvatarBtn from "./profileAvatar";
import { Suspense } from "react";
import Image from "next/image";
import Title from "./header-title";
import SearchDisplayPath from "./Search-display-path";
import Profile from "./profile";

const Header = () => {
  return (
    <div className='border-b  dark:border-neutral-600  px-4 flex z-10 justify-between gap-4 items-center h-[10vh] '>
      <h3 className='hidden lg:flex text-orange-600 items-center justify-start font-black text-4xl text-nowrap'>
        <Title />
      </h3>

      <Link href='/'>
        <div className='block lg:hidden py-3'>
          <Image
            src={
              "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYCsudO05EwIl5vQdWOGxmz6pU9Tu1SJHobh03"
            }
            alt='logo'
            width={30}
            height={30}
          />
        </div>
      </Link>

      <SearchDisplayPath />

      <div className='flex  items-center justify-end w-1/2 md:w-full'>
        <div className='flex justify-center flex-row-reverse items-center gap-2 border rounded-full p-1'>
          {/* <Suspense fallback={<div>Loading ....</div>}>
            <AvatarBtn />
          </Suspense> */}

          <Profile />

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
