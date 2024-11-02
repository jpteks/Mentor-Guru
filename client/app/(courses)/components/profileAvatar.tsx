/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Link from "next/link";

const AvatarBtn = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='z-50'>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none' asChild>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full flex items-center justify-center p-2 relative'
          >
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <div className={`flex flex-col items-start space-y-2 p-2 `}>
            <Link
              href='/'
              className='text-sm font-medium hover:bg-blue-200 dark:hover:bg-slate-600 w-full hover:p-1 hover:rounded-md'
            >
              Profile
            </Link>

            <Link
              href='/'
              className='text-sm font-medium hover:bg-blue-200 dark:hover:bg-slate-600 w-full hover:p-1 hover:rounded-md'
            >
              Subscription
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarBtn;
