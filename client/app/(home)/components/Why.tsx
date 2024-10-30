"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import { Check } from "lucide-react";

import React, { useRef } from "react";
import { CardHover } from "./HoverCard";
const Why = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scalePogress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacityPogress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  return (
    <motion.div
      ref={ref}
      style={{
        scale: scalePogress,
        opacity: opacityPogress,
      }}
      className='min-h-screen hidden md:flex items-center justify-center '
    >
      <div className='max-w-6xl mx-auto p-8 grid grid-rows-1 md:grid-cols-[1fr_2fr]  '>
        {/* Main Title Section */}
        <div className='text-left mb-12'>
          <h1 className='text-4xl font-bold '>
            Why <span className='text-blue-500'>Learning Online</span> is Best
            for <span className='text-orange-500'>Students</span>
          </h1>

          {/* Checkmarks Section */}
          <ul className='mt-6 space-y-4 text-lg'>
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
    </motion.div>
  );
};

export default Why;
