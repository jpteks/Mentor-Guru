"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemsProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

const SidebarItems = ({ icon: Icon, label, href }: SidebarItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (pathname === "/" && href === "/") || pathname === href;

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-blue-600  hover:bg-sky-100 w-full",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div
        //className='flex items-center gap-x-2 py-2'
        className='flex h-[48px] grow items-center justify-center gap-2  p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 w-full'
      >
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        <p className='hidden md:block'>{label}</p>
      </div>
    </button>
  );
};

export default SidebarItems;
