import Link from "next/link";
import React from "react";

const AuthWrapper = ({
  children,
  link,
  text,
  href,
  title
}: Readonly<{
  children: React.ReactNode;
  link: string;
  text: string;
  href: string;
  title: string;
}>) => {
  return (
    <div className=' min-h-screen flex flex-col items-center justify-center'>
      <h1 className='md:text-5xl text-3xl text-center font-medium text-[#155FA0]'>
        {title}
      </h1>
      <p className='text-slate-700 text-sm'>
        {text}
        <Link href={href} className='text-[#155FA0] underline'>
          {link}
        </Link>
      </p>
      {children}
    </div>
  );
};

export default AuthWrapper;
