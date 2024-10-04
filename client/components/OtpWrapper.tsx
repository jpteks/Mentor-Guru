import Link from "next/link";
import React from "react";

const OtpWrapper = ({
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
    <div>
      <h1 className='md:text-5xl text-3xl text-center font-medium text-[#155FA0]'>
        {title}
      </h1>
      <p className='text-slate-700 text-sm text-center mb-8'>
        {text}
        <Link href={href} className='text-[#155FA0] underline'>
          {link}
        </Link>
      </p>
      {children}
    </div>
  );
};

export default OtpWrapper;
