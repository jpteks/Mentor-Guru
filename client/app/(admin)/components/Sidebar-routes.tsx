"use client";

import {
  Files,
  LucideLayoutDashboard,
  LucideUploadCloud,
  Users,
} from "lucide-react";
import SidebarItems from "./Siderbar-items";

const SidebarRoutes = () => {
  const guestRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: LucideLayoutDashboard },
    {
      href: "/dashboard/upload-papers",
      label: "upload papers",
      icon: LucideUploadCloud,
    },
    {
       href: "/dashboard/upload-solutions",
      label: "upload solutions",
      icon: LucideUploadCloud,
    },
    {
      label: "Subscribers",
      href: "/dashboard/subscriptions",
      icon: Files,
    },
    { label: "Users", href: "/dashboard/users", icon: Users },
  ];
  const routes = guestRoutes;
  return (
    <>
      <div className='grow text-sm font-medium'>
        {routes.map(route => (
          <SidebarItems
            key={route.href}
            href={route.href}
            label={route.label as string}
            icon={route.icon}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarRoutes;
