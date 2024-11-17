/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from John Doe",
      timestamp: "2023-05-01T10:30:00Z",
      read: true,
    },
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from Jack Doe",
      timestamp: "2023-05-01T10:30:00Z",
      read: false,
    },
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from Peter Doe",
      timestamp: "2023-05-01T10:30:00Z",
      read: false,
    },
  ];
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
            <div
              className={`absolute top-0 right-0 h-2 w-2 rounded-full ${notifications.find(
                (x: any) => x.read === true && " bg-red-500"
              )}`}
            />
            <Bell className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {notifications.map((notification: any) => (
            <div
              key={notification.id}
              className={`flex items-center space-x-2 p-2 ${
                notification.read && "bg-gray-100 text-black"
              }`}
            >
              <div className='flex-1'>
                <p className='text-sm font-medium'>{notification.title}</p>
                <p className='text-xs text-gray-500'>{notification.message}</p>
              </div>
              <div className='text-xs text-gray-500'>
                {new Date(notification.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
