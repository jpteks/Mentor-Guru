import Link from "next/link";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const AuthWrapper = ({
  children,
  link,
  text,
  href,
  title,
}: Readonly<{
  children: React.ReactNode;
  link: string;
  text: string;
  href: string;
  title: string;
}>) => {
  return (
    <Card className='max-w-lg w-full mx-auto my-auto p-3 flex flex-col items-center justify-center bg-white text-black'>
      <CardHeader>
        <CardTitle className='md:text-5xl text-3xl text-center font-medium text-[#155FA0]'>
          {title}
        </CardTitle>
        <CardDescription className='text-slate-700 text-sm text-center'>
          {text}
          <Link href={href} className='text-[#155FA0] underline'>
            {link}
          </Link>
        </CardDescription>
      </CardHeader>

      {children}
    </Card>
  );
};

export default AuthWrapper;
