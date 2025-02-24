"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Search from "./Search";
const SearchDisplayPath = () => {
  const pathname = usePathname();
  const path = pathname.replace(/^\/([^\/?]+).*/, "$1");
  return (
    <div className='w-full hidden lg:flex justify-center'>
      {path === "courses" ? (
        <div className='w-full hidden lg:flex justify-center '>
          <Suspense fallback={<div>Loading ....</div>}>
            <Search placeholder='search course...' />
          </Suspense>
        </div>
      ) : path === "resources" ? (
        <div></div>
      ) : null}
    </div>
  );
};

export default SearchDisplayPath;
