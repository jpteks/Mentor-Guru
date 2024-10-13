import { Search,Home as HomeIcon,Book,FileText,Bell,HelpCircle,User,LogOut,MessageSquare } from "lucide-react";
import Image from "next/image";
import {ArrowRight} from "lucide-react";

export default function Courses() {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-64 bg-indigo-800 text-white flex flex-col p-6'>
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
        <nav className="mt-10">
            <ul>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                  <HomeIcon className="mr-2" /> Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900">
                  <Book className="mr-2" /> Courses
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900">
                  <FileText className="mr-2" /> Quizzes
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900">
                  <FileText className="mr-2" /> Past Papers
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900">
                  <FileText className="mr-2" /> Answers
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                  <Bell className="mr-2" /> Notifications
                </a>
              </li>
            </ul>
          </nav>
  
          <hr className="my-24" />
  
          <div>
            <ul>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                  <HelpCircle className="mr-2" /> Help Center
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                  <MessageSquare className="mr-2" /> Feedback
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                  <User className="mr-2" /> Profile
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                  <LogOut className="mr-2" /> Logout
                </a>
              </li>
            </ul>
          </div>
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
              className='w-full px-4 py-2 border border-blue-700 rounded-md focus:outline-none focus:border-blue-500'
            />
            <button className=' '>
              <Search className='text-blue-500 w-6 ' />
            </button>
          </div>
          <div className='bg-indigo-800 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center ml-4'>
            JP
          </div>
        </div>

        {/* Category Filters */}
        <div className='flex space-x-4 mb-8 text-white font-bold'>
          <button className='bg-indigo-800 px-4 py-2 rounded-full'>All</button>
          <button className='bg-indigo-800 px-4 py-2 rounded-full'>
            Mathematics
          </button>
          <button className='bg-indigo-800 px-4 py-2 rounded-full'>
            Economics
          </button>
          <button className='bg-indigo-800 px-4 py-2 rounded-full'>
            English
          </button>
          <button className='bg-indigo-800 px-4 py-2 rounded-full'>ICT</button>
        </div>

        <hr className='border-t-2 border-blue-500 mb-8'/>

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
              <p className='text-sm text-black'>
                This course provides you a detailed understanding on functions,
                from the basics arithetic of function to more complex.
              </p>
              <div className='flex space-x-8 mt-2'>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">Functions</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">Mathematics</button>
                <button><ArrowRight className="bg-blue-500 text-white  rounded-lg  "/></button>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-blue-500 font-bold'>★ 5.0</span>
              <br />
              <span className='text-gray-500 text-sm'>Instructor: Mr. Joe</span>
              <br />
              <span className='text-gray-500 text-sm'>Duration: 1hr</span>
            </div>
          </div>

          {/* Course 2 */}
          <div className='bg-white rounded-lg shadow-lg border border-blue-500 p-4 flex items-center space-x-4'>
            <Image
              src='/course2.jpg'
              alt='Inequalities'
              width={100}
              height={100}
              className='rounded-md'
            />
            <div className='flex-1'>
              <h2 className='text-xl font-bold text-blue-500'>Inequalities</h2>
              <p className='text-sm  text-black'>
              This course provides you a detailed understanding on Inequalities,
              from the basics arithetic of Inequalities to more complex.
              </p>
              <div className='flex space-x-8 mt-2'>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">Inequalities</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">Mathematics</button>
                <button><ArrowRight className="bg-blue-500 text-white  rounded-lg  "/></button>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-blue-500 font-bold'>★ 4.3</span>
              <br />
              <span className='text-gray-500 text-sm'>Instructor: Mr. Joe</span>
              <br />
              <span className='text-gray-500 text-sm'>Duration: 1hr</span>
            </div>
          </div>

          {/* Course 3 */}
          <div className='bg-white rounded-lg shadow-lg border border-blue-500 p-4 flex items-center space-x-4'>
            <Image
              src='/course3.jpg'
              alt='Essay Writing'
              width={100}
              height={100}
              className='rounded-md'
            />
            <div className='flex-1'>
              <h2 className='text-xl font-bold text-blue-500'>Essay Writing</h2>
              <p className='text-sm text-black'>
                This course provides you a detailed understanding on essay
                writing
              </p>
              <div className='flex space-x-8 mt-2'>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">Essay Writing</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">English</button>
                <button><ArrowRight className="bg-blue-500 text-white  rounded-lg  "/></button>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-blue-500 font-bold'>★ 4.3</span>
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
