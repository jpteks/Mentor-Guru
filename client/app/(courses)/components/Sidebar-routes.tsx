"use client";

import { FileText, LayoutDashboard, File, BookOpen } from "lucide-react";
import SidebarItems from "./Siderbar-items";

const SidebarRoutes = () => {
  const guestRoutes = [
    { href: "/userid/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses", label: "All Courses", icon: BookOpen },
    { href: "/past-papers", label: "PastPapers", icon: File },
    { href: "/solutions", label: "Solutions", icon: FileText },
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
