"use client";

import { HomeIcon, Upload } from "lucide-react";
import SidebarItems from "./Siderbar-items";

const SidebarRoutes = () => {
  const guestRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/dashboard/upload-papers", label: "upload", icon: Upload },
  ];
  const routes = guestRoutes;
  return (
    <>
      <div className='grow text-sm font-medium'>
        {routes.map(route => (
          <SidebarItems
            key={route.href}
            href={route.href}
            label={route.label}
            icon={route.icon}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarRoutes;
