"use client";

import { HomeIcon, Book, FileText } from "lucide-react";
import SidebarItems from "./Siderbar-items";

const SidebarRoutes = () => {
  const guestRoutes = [
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/courses", label: "Courses", icon: Book },
    { href: "/past-papers", label: "PastPapers", icon: FileText },
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
