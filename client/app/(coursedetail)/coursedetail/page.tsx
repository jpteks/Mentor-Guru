import { Home as HomeIcon, Book, FileText, Bell, HelpCircle, User, LogOut, Star, Share2, Bookmark, MessageSquare, PauseCircle, CheckCircle, PlayCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";


export default function CourseOverview() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}<div className="w-64 bg-blue-700 text-white flex flex-col p-6">
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
                <a href="#" className="flex items-center px-4 py-2 hover:bg-blue-500 rounded">
                  <HomeIcon className="mr-2" /> Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-blue-500">
                  <Book className="mr-2" /> Courses
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-blue-500">
                  <FileText className="mr-2" /> Quizzes
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-blue-500">
                  <FileText className="mr-2" /> Past Papers
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-blue-500">
                  <FileText className="mr-2" /> Answers
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                  <Bell className="mr-2" /> Notifications
                </a>
              </li>
            </ul>
          </nav>
  
          <hr className="my-24" />
  
          <div>
            <ul>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                  <HelpCircle className="mr-2" /> Help Center
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                  <MessageSquare className="mr-2" /> Feedback
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                  <User className="mr-2" /> Profile
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                  <LogOut className="mr-2" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

      {/* Main Content */}
      <main className="flex-grow p-8 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-blue-700">Introduction to functions</h1>
          <div className="flex items-center space-x-4">
          <div className='bg-blue-700 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center ml-4'>
            JP
          </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-3 gap-">
          {/* Video section */}
          <div className="col-span-2 bg-white p-6 ">
            <div className="relative w-full h-48 bg-green-500 rounded-lg mb-4">
              {/* Placeholder for video */}
              <img src="/function-video-thumbnail.png" alt="Function video" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-2 left-2 text-white bg-black px-2 py-1 rounded-md text-xs">01:25/5:00</div>
            </div>
            <div className='flex space-x-80 mt-8'>
              <div>
              <p className="text-gray-700 font-bold">Instructor Mr. Joe</p>
              <p className="text-sm text-gray-500">Professor, Mechanical Engineer</p>
              </div>
              <div className='flex'>
                  <Share2 className="text-blue-800" size={24} />
                  <Bookmark className="text-purple-800" size={24} />
              </div>
            </div>
            <div className='mt-4 '>
                <h1 className='text-5xl font-semibold'>About this course</h1>
              <p className="text-gray-600 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula libero, ullamcorper vel maximus ac, scelerisque sed nibh.</p>
            </div>
            {/* Rating Section */}
        <div className="">
          <h2 className="text-2xl font-semibold">Rate this course</h2>
          <div className="flex items-center mt-2">
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-gray-300" />
          </div>
        </div>
          </div>

          {/* Progress and Quiz section */}
          <div className="col-span-1  p-6 ">
          <div className="flex flex-col items-center bg-blue-800 rounded-lg p-4">
  <p className="text-lg text-white font-semibold ">Study Progress</p>
  
  {/* Progress Bar */}
  <Progress value={45} className="w-full bg-gray-300">
    <div
      className="h-full bg-white rounded-full"
      style={{ width: `${45}%` }}
    />
  </Progress>
  
  <p className="text-lg text-white">45%</p>
</div>
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-blue-600 font-semibold">Course Completion</h3>
              <span className='text-blue-600'>1/4</span>
            </div>
            <div className="flex items-center space-x-4 p-2 mt-8 bg-gray-100 rounded-lg">
            <PlayCircle className="text-blue-700  " size={24} />
        <div >
          <h3 className="text-blue-600 font-semibold">Introduction to functions</h3>
          <p className="text-sm text-black">5m</p>          
        </div>
        <CheckCircle className="text-blue-600" size={24} />
      </div>

      {/* Lesson 2 - Active */}
      <div className="flex items-center space-x-4 p-4 bg-blue-600 mt-4 text-white rounded-lg">
        <PauseCircle size={24} />
        <div>
          <h3 className="font-semibold">Functions operations</h3>
          <p className="text-sm ">30m</p>
        </div>
      </div>

      {/* Lesson 3 - Pending */}
      <div className="flex items-center space-x-4 p-4 mt-4 bg-gray-100 rounded-lg">
        <PlayCircle className="text-blue-600" size={24} />
        <div>
          <h3 className="text-blue-600 font-semibold">Graph Functions</h3>
          <p className="text-sm text-black">20m</p>
        </div>
      </div>

      {/* Lesson 4 - Pending */}
      <div className="flex items-center space-x-4 p-4 mt-4 bg-gray-100 rounded-lg">
        <PlayCircle className="text-blue-600" size={24} />
        <div>
          <h3 className="text-blue-600 font-semibold">Conclusion</h3>
          <p className="text-sm text-black">5m</p>
        </div>
      </div>
         <button className="mt-4 bg-blue-600 text-white py-2 px-4 w-full rounded-lg">Quiz</button>
          </div>
        </div>
      </main>
    </div>
  );
}
