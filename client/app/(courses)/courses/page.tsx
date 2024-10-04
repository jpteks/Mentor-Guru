import { Search } from "lucide-react";
import Image from "next/image";

export default function Courses() {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-64 bg-purple-900 text-white flex flex-col p-6'>
        <div className='flex items-center mb-8'>
          {/* Logo */}
          <div className='bg-white p-2 rounded-md'>
            <Image
              src='/logo.png'
              alt='Mentor Guru Logo'
              width={40}
              height={40}
            />
          </div>
          <span className='ml-4 font-bold text-xl'>Mentor Guru</span>
        </div>

        {/* Sidebar Menu */}
        <nav className='space-y-4 grid grid-flow-row'>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Dashboard
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Courses
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Quizzes
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            PastPapers
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Answers
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Notification
          </a>

          {/* Custom Divider */}
          <hr />

          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Help Center
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Feedback
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Profile
          </a>
          <a href='#' className='hover:bg-purple-700 p-2 rounded-md'>
            Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className='flex-1 bg-gray-100 p-8'>
        {/* Search Bar */}
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text font-bold'>Courses</h1>
          <div className='flex items-center justify-between w-96 space-x-4'>
            <input
              type='text'
              placeholder='Search course by title'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
            <button className=' '>
              <Search className='text-blue-500 w-6 ' />
            </button>
          </div>
          <div className='bg-blue-700 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center ml-4'>
            JP
          </div>
        </div>

        {/* Category Filters */}
        <div className='flex space-x-4 mb-8 text-white font-bold'>
          <button className='bg-blue-700  px-4 py-2 rounded-full'>All</button>
          <button className='bg-blue-700 px-4 py-2 rounded-full'>
            Mathematics
          </button>
          <button className='bg-blue-700 px-4 py-2 rounded-full'>
            Economics
          </button>
          <button className='bg-blue-700 px-4 py-2 rounded-full'>
            English
          </button>
          <button className='bg-blue-700 px-4 py-2 rounded-full'>ICT</button>
        </div>

        {/* Course Cards */}
        <div className='space-y-6'>
          {/* Course 1 */}
          <div className='bg-white rounded-lg shadow-lg border border-blue-500 p-4 flex items-center space-x-4'>
            <Image
              src='/course1.jpg'
              alt='Functions'
              width={100}
              height={100}
              className='rounded-md'
            />
            <div className='flex-1'>
              <h2 className='text-xl font-bold text-blue-500'>Functions</h2>
              <p className='text-sm text-gray-600'>
                This course provides you a detailed understanding on functions,
                from the basics arithetic of function to more complex.
              </p>
              <div className='flex space-x-2 mt-2'>
                <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-xs'>
                  Mathematics
                </span>
                <span className='bg-gray-200 text-black px-2 py-1 rounded-full text-xs'>
                  Functions
                </span>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-blue-500 font-bold'>5.0 ★</span>
              <br />
              <span className='text-gray-500 text-sm'>Instructor: Mr. Joe</span>
              <br />
              <span className='text-gray-500 text-sm'>Duration: 1hr</span>
            </div>
          </div>

          {/* Course 2 */}
          <div className='bg-white rounded-lg shadow-md p-4 flex items-center space-x-4'>
            <Image
              src='/course2.jpg'
              alt='Inequalities'
              width={100}
              height={100}
              className='rounded-md'
            />
            <div className='flex-1'>
              <h2 className='text-xl font-bold'>Inequalities</h2>
              <p className='text-sm text-gray-600'>
                This course provides you a detailed understanding on
                inequalities...
              </p>
              <div className='flex space-x-2 mt-2'>
                <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-xs'>
                  Mathematics
                </span>
                <span className='bg-gray-200 text-black px-2 py-1 rounded-full text-xs'>
                  Inequalities
                </span>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-blue-500 font-bold'>4.3 ★</span>
              <br />
              <span className='text-gray-500 text-sm'>Instructor: Mr. Joe</span>
              <br />
              <span className='text-gray-500 text-sm'>Duration: 1hr</span>
            </div>
          </div>

          {/* Course 3 */}
          <div className='bg-white rounded-lg shadow-md p-4 flex items-center space-x-4'>
            <Image
              src='/course3.jpg'
              alt='Essay Writing'
              width={100}
              height={100}
              className='rounded-md'
            />
            <div className='flex-1'>
              <h2 className='text-xl font-bold'>Essay Writing</h2>
              <p className='text-sm text-gray-600'>
                This course provides you a detailed understanding on essay
                writing...
              </p>
              <div className='flex space-x-2 mt-2'>
                <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-xs'>
                  English
                </span>
                <span className='bg-gray-200 text-black px-2 py-1 rounded-full text-xs'>
                  Essay Writing
                </span>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-blue-500 font-bold'>4.3 ★</span>
              <br />
              <span className='text-gray-500 text-sm'>Instructor: Mr. Joe</span>
              <br />
              <span className='text-gray-500 text-sm'>Duration: 1hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
