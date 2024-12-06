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
import Logout from "./logout";
import { PersonIcon } from "@radix-ui/react-icons";
import { usersType } from "@/types/user";

const AvatarBtnContent = ({ data }: { data: usersType }) => {
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
              <AvatarImage
                src={`${data.avatarUrl}`}
                className='object-cover'
                alt='userimg'
              />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <div className={`flex flex-col items-start space-y-2 p-2 `}>
            <Link
              href={`/${data._id}/profile`}
              className='text-xs hover:underline font-medium  w-full flex items-center justify-center gap-2 hover:rounded-md'
            >
              <PersonIcon />
              Profile
            </Link>

            <Link
              href='/'
              className='text-sm font-medium hover:bg-blue-200w-full  hover:rounded-md'
            >
              <Logout />
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarBtnContent;
