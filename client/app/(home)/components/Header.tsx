import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Header = () => {
  return (
    <div className=' justify-between items-center py-1 max-w-6xl mx-auto hidden md:flex'>
      <div className='bg-transparent rounded-full  w-14 h-14'>
        <Image
          src={
            "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYCsudO05EwIl5vQdWOGxmz6pU9Tu1SJHobh03"
          }
          alt='logo'
          width={60}
          height={60}
        />
      </div>
      <div className=''>
        <ModeToggle />
      </div>
      <Link href='/courses'>
        <Button
          variant='link'
          className=' bg-transparent border font-sans text-xs border-black  text-black dark:text-white dark:border-white  px-4 py-2 rounded-xl'
        >
          Try Now for Free
          <ArrowRight size={12} />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
