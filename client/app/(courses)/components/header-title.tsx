"use client";

import { usePathname } from "next/navigation";

const Title = () => {
  const pathname = usePathname();

  const title = pathname.replace(/^\/([^\/?]+).*/, "$1");

  console.log(title);

  // Correct condition using an array and includes
  if (!["courses", "past-papers", "solutions", "resources"].includes(title)) {
    return null;
  }

  return <span>{title}</span>;
};

export default Title;
