import {
    Home as HomeIcon,
    Book,
    FileText,
    Bell,
    HelpCircle,
    User,
    LogOut,
    Star,
    ChevronDown,
    MessageSquare,
    TrendingUp 
  } from 'lucide-react';
  
  export default function Home() {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-indigo-800 text-white flex flex-col p-6">
          <div className="flex items-center mb-8">
            {/* Logo */}
            <div className="bg-white p-2 rounded-md">
              <img src="/logo.png" alt="Mentor Guru Logo" width={40} height={40} />
            </div>
            <span className="ml-4 font-bold text-xl">Mentor Guru</span>
          </div>
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
          
        </div>
  
        {/* Main Content */}
        <div className="flex-grow p-8 mt-24 ">
          {/* Course Overview Section */}
          <div className="p-8 rounded-lg shadow-lg bg-green-600">
            <div className="w-full h-full rounded-lg">
              <div className="">
                <h2 className="text-white text-3xl font-bold">Functions</h2>
                <p className="text-white mt-2">
                  This course provides you a detailed understanding of functions, from basic arithmetic to more complex operations.
                </p>
                <div className="flex items-center gap-10">
                  <div className="text-gray-500">
                    <p>Duration: 1hr</p>
                  </div>
                  <div className="flex">
                    <User className="mr-2 text-white" />
                    <p className="text-white">4.9k</p>
                  </div>
                  <div className="text-white">
                    <p>Instructor: Mr. Joe</p>
                  </div>
                  <div className="flex gap-2">
                    <Star className="text-yellow-500" />
                    <p className="text-white">5.0</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="bg-white text-blue-500 px-4 py-2 rounded-lg">Watch Preview</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Enroll Course</button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Lesson Plan Section */}
          <div className="flex space-x-4 p-8">
            <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg">
              <Star className="text-blue-500" size={18} />
            </div>
            <div>
              <h3 className="text-blue-500 font-semibold">Course Overview</h3>
              <p className="text-blue-500 text-sm">2 lectures . 1hr</p>
            </div>
          </div>
  
          <div className="px-8">
            <div className="border border-blue-500 rounded-lg">
              <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between">
                <h3>Getting Started</h3>
                <div className="flex items-center space-x-1">
                  <span>2 lectures . 1hr</span>
                  <ChevronDown />
                </div>
              </div>
              <div className="p-4 border-b border-black">
                <div className="flex justify-between">
                  <span className='flex gap-4'><TrendingUp className="text-black" size={16} />Introduction to functions</span>
                  <span>5m</span>
                </div>
              </div>
              <div className="p-4 border-b border-black">
                <div className="flex justify-between">
                  <span className='flex gap-4'><TrendingUp className="text-black" size={16} />Basic operations on functions</span>
                  <span>30m</span>
                </div>
              </div>
              <div className="p-4 border-b border-black">
                <div className="flex justify-between">
                  <span className='flex gap-4'><TrendingUp className="text-black" size={16} />Graph functions</span>
                  <span>20m</span>
                </div>
              </div>
              <div className="p-4 border-b border-black">
                <div className="flex justify-between">
                  <span className='flex gap-4'><TrendingUp className="text-black" size={16} />Conclusion</span>
                  <span>5m</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <span className='flex gap-4'><TrendingUp className="text-black" size={16} />Quiz</span>
                  <span>5m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-indigo-800 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center">
        JP
      </div>
      </div>
    );
  }
  