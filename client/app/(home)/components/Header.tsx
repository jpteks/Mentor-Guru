import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Header = () => {
  return (
    <div className=' justify-between items-center py-4 max-w-6xl mx-auto hidden md:flex'>
      <div className='bg-white rounded-full p-2 w-14 h-14'>
        <Image src={"/logo.png"} alt='logo' width={60} height={60} />
      </div>
      <div className=''>
        <ModeToggle />
      </div>
      <Link href='/courses'>
        <Button variant="link" className=' bg-transparent border-2 border-black  text-black dark:text-white dark:border-white  px-4 py-2 rounded-full'>
          Try Now for Free
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
