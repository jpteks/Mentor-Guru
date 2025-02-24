"use client";

import { FileText, LayoutDashboard, File, BookOpen, Layers } from "lucide-react";
import SidebarItems from "./Siderbar-items";

const SidebarRoutes = () => {
  const guestRoutes = [
    { href: "/userid/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses", label: "All Courses", icon: BookOpen },
    { href: "/past-papers", label: "PastPapers", icon: File },
    { href: "/solutions", label: "Solutions", icon: FileText },
    {href: '/resources',label: "Resources", icon: Layers }
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
