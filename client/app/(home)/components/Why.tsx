"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

import React, { useRef } from "react";
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
      className='min-h-screen flex items-center justify-center '
    >
      <div className='max-w-6xl mx-auto p-8 flex flex-wrap md:flex-nowrap'>
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

        {/* Cards Section */}
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mx-auto gap-6'>
          {/* Card 1 */}
          <div className='bg-blue-500 p-6 rounded-lg flex items-center'>
            <Image
              src='/images/5484597.jpg'
              alt='Icon'
              width={64}
              height={64}
              className='mr-4'
            />
            <div className='text-white'>
              <h2 className='md:text-xl font-semibold'>
                Content Created by Industry Experts
              </h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className='bg-white p-6 rounded-lg border border-gray-300 flex items-center'>
            <Image
              src='/images/icon.png'
              alt='Icon'
              width={64}
              height={64}
              className='mr-4'
            />
            <div className='text-gray-800'>
              <h2 className='md:text-xl font-semibold'>
                Practical Projects & Assignments
              </h2>
            </div>
          </div>

          {/* Card 3 */}
          <div className='bg-white p-6 rounded-lg border border-gray-300 flex items-center'>
            <Image
              src='/images/icon.png'
              alt='Icon'
              width={64}
              height={64}
              className='mr-4'
            />
            <div className='text-gray-800'>
              <h2 className='md:text-xl font-semibold'>
                Interactive Learning Experience
              </h2>
            </div>
          </div>

          {/* Card 4 */}
          <div className='bg-white p-6 rounded-lg border border-gray-300 flex items-center'>
            <Image
              src='/images/icon.png'
              alt='Icon'
              width={64}
              height={64}
              className='mr-4'
            />
            <div className='text-gray-800'>
              <h2 className='md:text-xl font-semibold'>
                Community & Collaboration
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Why;
