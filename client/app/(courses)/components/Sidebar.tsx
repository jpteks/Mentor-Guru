import { HomeIcon, Book, FileText, LogOut, GraduationCap } from "lucide-react";
import Link from "next/link";

const SiderBar = () => {
  return (
    <aside className=' fixed left-0 w-[250px] border-r dark:border-neutral-600 min-h-screen flex flex-col gap-4 dark:bg-[#1d1e22] p-6 text-xs '>
      <div className='border-b dark:border-neutral-600'>
        <Link href='/' className='flex  p-2 rounded-md text-lg font-bold'>
          <GraduationCap className='mr-2 ' />
          Mentor Guru
        </Link>
      </div>
      <div className='grow text-sm font-medium dark:text-neutral-100'>
        <nav className='flex flex-col'>
          <a
            href='#'
            className='flex hover:border-l hover:border-blue-600 p-2 '
          >
            <HomeIcon className='mr-2' size={16} />
            Dashboard
          </a>
          <a
            href='#'
            className='flex hover:border-l  hover:border-blue-600 p-2 '
          >
            <Book className='mr-2' size={16} />
            Courses
          </a>
          <a
            href='#'
            className='flex hover:border-l  hover:border-blue-600 p-2 '
          >
            <FileText className='mr-2' size={16} />
            PastPapers
          </a>
          <a
            href='#'
            className='flex hover:border-l hover:border-blue-600 p-2 '
          >
            <FileText className='mr-2' size={16} />
            Solutions
          </a>
        </nav>
      </div>

      <div className='border-t dark:border-neutral-600'>
        <a href='#' className='flex  p-2 rounded-md'>
          <LogOut className='mr-2 ' size={16} />
          Logout
        </a>
      </div>
    </aside>
  );
};

export default SiderBar;
