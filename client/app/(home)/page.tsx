import { Check, GraduationCap } from "lucide-react";
//import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import TypeAnime from "./components/TypeAnime";
import * as motion from "framer-motion/client";
import CardBox from "./components/Card";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div>
      {/* Section 1: Hero Section with Geometric Background */}
      <section className='bg-cover bg-blue-600 dark:bg-inherit  bg-center min-h-screen flex flex-col items-center justify-center relative overflow-hidden '>
        <GraduationCap className='absolute left-10 top-10' size={52} />
        <div className='absolute left-900 top-10'>
          <ModeToggle />
        </div>
        <h1 className='text-4xl md:text-6xl p-3  font-black z-10 text-center text-white'>
          Start Learning from <TypeAnime /> <br /> & Talented
          <span className='text-orange-500'> Tutors.</span>
        </h1>

        <div className='flex space-x-4 mt-8 z-10'>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            drag='x'
            dragConstraints={{ left: -100, right: 100 }}
            className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition'
          >
            Join Us Now
          </motion.button>
          <Link href='/signin'>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className='bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition'
            >
              Start Learning
            </motion.button>
          </Link>
        </div>

        <Link href='/courses'>
          <button className='hidden md:flex absolute top-10 right-10 bg-orange-500 text-white px-4 py-2 rounded-md z-10 hover:bg-orange-600 transition'>
            Browse Course
          </button>
        </Link>
      </section>

      {/* Section 2: Why Learning Online is Best for Student */}
      <div className='min-h-screen flex items-center justify-center '>
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
      </div>

      {/* Testimonial Section */}
      <section className='py-12'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold'>
            Our Successful <span className='text-orange-500'>Stories</span>
          </h1>
        </div>

        <div className='max-w-6xl mx-auto  px-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Testimonial Card 1 */}
          <CardBox />

          {/* Testimonial Card 2 */}
          <CardBox />

          {/* Testimonial Card 3 */}
          <CardBox />
        </div>
      </section>

      {/* Video Section */}
      <section className=' flex items-center justify-center py-16 h-96'>
        <button className='w-16 h-16 bg-white rounded-full flex items-center justify-center'>
          <svg
            className='w-8 h-8 text-black'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M14.752 11.168l-5.197-2.878A1 1 0 008 9.118v5.764a1 1 0 001.555.832l5.197-2.878a1 1 0 000-1.664z'
            />
          </svg>
        </button>
      </section>

      <div className=' py-16 '>
        {/* Stats Section */}
        <div className='flex justify-center gap-2 md:space-x-8 mb-16 flex-wrap'>
          <div className='bg-blue-600 text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>USERS</h4>
            <p className='text-3xl font-bold'>2000+</p>
          </div>

          <div className='bg-blue-600 text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>INSTRUCTORS</h4>
            <p className='text-3xl font-bold'>15+</p>
          </div>

          <div className='bg-blue-600 text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>LEARNERS</h4>
            <p className='text-3xl font-bold'>500K+</p>
          </div>

          <div className='bg-blue-600 text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>COURSES</h4>
            <p className='text-3xl font-bold'>10+</p>
          </div>
        </div>
      </div>

      <footer className=' py-6 text-xs max-w-xl mx-auto border'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
          <div className=''>
            <div className='text-sm '>Mentor Guru</div>
            <div className='text-xs mt-2 md:mt-0'>
              <span>Copyright © 2024</span>
            </div>
          </div>
          <div className='mt-2 md:mt-0 flex space-x-6'>
            <a
              href='/privacy-policy'
              className='dark:text-gray-400 hover:text-slate-500 dark:hover:text-white'
            >
              privacy policy
            </a>
            <a
              href='/terms-conditions'
              className='dark:text-gray-400 hover:text-slate-500 dark:hover:text-white'
            >
              Terms & Conditions
            </a>
          </div>
          <div className='mt-4 md:mt-0 flex space-x-4'>
            <a
              href='https://www.linkedin.com'
              aria-label='LinkedIn'
              className='dark:text-gray-400 hover:text-slate-500  dark:hover:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.801-1.75-1.732 0-.932.784-1.732 1.75-1.732s1.75.801 1.75 1.732c0 .932-.784 1.732-1.75 1.732zm13.5 10.268h-3v-4.5c0-1.125-.023-2.576-1.567-2.576-1.568 0-1.807 1.226-1.807 2.493v4.583h-3v-9h2.885v1.229h.041c.402-.761 1.381-1.562 2.843-1.562 3.039 0 3.604 2.001 3.604 4.601v4.732z' />
              </svg>
            </a>
            <a
              href='https://www.facebook.com'
              aria-label='Facebook'
              className='dark:text-gray-400 hover:text-slate-500  dark:hover:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M22.675 0h-21.35c-.731 0-1.325.594-1.325 1.325v21.351c0 .73.594 1.324 1.325 1.324h11.483v-9.301h-3.129v-3.622h3.129v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.243h-1.918c-1.504 0-1.794.715-1.794 1.762v2.31h3.587l-.467 3.621h-3.12v9.301h6.117c.73 0 1.324-.594 1.324-1.324v-21.35c0-.731-.594-1.325-1.324-1.325z' />
              </svg>
            </a>
            <a
              href='https://www.x.com'
              aria-label='X (Twitter)'
              className='dark:text-gray-400 hover:text-slate-500  dark:hover:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.896-.955-2.173-1.549-3.591-1.549-2.717 0-4.917 2.201-4.917 4.917 0 .386.043.762.127 1.124-4.083-.205-7.702-2.161-10.126-5.134-.423.725-.666 1.566-.666 2.465 0 1.701.866 3.2 2.182 4.079-.803-.025-1.56-.246-2.22-.615v.061c0 2.374 1.688 4.354 3.928 4.803-.411.111-.844.171-1.29.171-.316 0-.623-.031-.923-.088.623 1.947 2.432 3.366 4.575 3.406-1.675 1.312-3.785 2.096-6.077 2.096-.395 0-.785-.023-1.17-.068 2.169 1.392 4.742 2.205 7.514 2.205 9.014 0 13.946-7.471 13.946-13.945 0-.213-.005-.426-.014-.637.956-.69 1.785-1.558 2.44-2.544z' />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
