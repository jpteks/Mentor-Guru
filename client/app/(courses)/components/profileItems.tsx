"use client";

import { cn } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";

interface ProfileItemsProps {
  label: string;
  //icon: LucideIcon;
  href: string;
}

const ProfileItems = ({ label, href }: ProfileItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        "flex items-center border-y gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full",
        isActive &&
          " bg-black dark:bg-white dark:text-black text-white"
      )}
    >
      <div className='flex items-center gap-x-2 py-2'>{label}</div>
    </button>
  );
};

export default ProfileItems;
