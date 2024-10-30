"use client";

import { Check } from "lucide-react";

import React, { useRef } from "react";
import { CardHover } from "./HoverCard";
const WhyMobile = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className='min-h-screen flex items-center justify-center md:hidden'
    >
      <div className='max-w-6xl mx-auto p-8 grid grid-rows-1 md:grid-cols-[1fr_2fr]  '>
        {/* Main Title Section */}
        <div className='text-left mb-12'>
          <h1 className='text-xl md:text-4xl font-bold '>
            Why <span className='text-blue-500'>Learning Online</span> is Best
            for <span className='text-orange-500'>Students</span>
          </h1>

          {/* Checkmarks Section */}
          <ul className='mt-6 space-y-4 text-sm'>
            <li className='flex items-center'>
              <div className='border-2 w-5 h-5 border-blue-400 bg-blue-400 rounded-full flex items-center justify-center'>
                <Check className='text-white w-4 h-4' />
              </div>
              <span className='ml-3'>
                E-learning platform with quality courses
              </span>
            </li>
            <li className='flex items-center'>
              <div className='border-2 w-5 h-5 border-blue-400 bg-blue-400 rounded-full flex items-center justify-center'>
                <Check className='text-white w-4 h-4' />
              </div>
              <span className='ml-3'>Practical projects & assignments</span>
            </li>
            <li className='flex items-center'>
              <div className='border-2 w-5 h-5 border-blue-400 bg-blue-400 rounded-full flex items-center justify-center'>
                <Check className='text-white w-4 h-4' />
              </div>
              <span className='ml-3'>Interactive learning experience</span>
            </li>
          </ul>
        </div>

        <CardHover />
      </div>
    </div>
  );
};

export default WhyMobile;
