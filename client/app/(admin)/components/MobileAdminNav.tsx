"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import {
  Files,
  LucideLayoutDashboard,
  LucideUploadCloud,
  PowerIcon,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
const MobileNav = () => {
  const routes = [
    { href: "/dashboard", label: "Dashboard", icon: LucideLayoutDashboard },
    {
      href: "/dashboard/upload-papers",
      label: "upload",
      icon: LucideUploadCloud,
    },
    {
      label: "Invoices",
      href: "/dashboard/invoices",
      icon: Files,
    },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
  ];
  const pathname = usePathname();
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className='flex justify-between  w-full py-2 md:hidden border-b'>
      {routes.map(route => (
        <button
          key={route.href}
          onClick={() => onClick(route.href)}
          type='button'
          className={cn(
            "flex items-center justify-center  text-slate-500  text-sm font-[500] transition-all hover:text-blue-600  hover:bg-sky-100 w-full",
            ((pathname === "/" && route.href === "/") ||
              pathname === route.href) &&
              "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 rounded-lg p-1 hover:text-sky-700"
          )}
        >
          <route.icon
            size={22}
            className={cn(
              "text-slate-500",
              (pathname === "/" && route.href === "/") ||
                (pathname === route.href && "text-sky-700")
            )}
          />
        </button>
      ))}

      <div className='flex items-center justify-between px-1 ml-2'>
        <ModeToggle />

        <form>
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
            <PowerIcon className='w-6' />
            <div className='hidden md:block'>Exit</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileNav;
