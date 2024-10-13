import React from 'react';
import { Home as HomeIcon,
    Book,
    FileText,
    Bell,
    HelpCircle,
    MessageSquare,
    User,
    LogOut,
    ArrowRight, } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white flex flex-col p-6">
        <div className="flex items-center mb-8">
          {/* Logo */}
          <div className="bg-white p-2 rounded-md">
            <img
              src="/logo.png"
              alt="Mentor Guru Logo"
              width={40}
              height={40}
            />
          </div>
          <span className="ml-4 font-bold text-xl">Mentor Guru</span>
        </div>
        <nav className="mt-10">
          <ul>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <HomeIcon className="mr-2" />Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
                <Book className="mr-2" />Courses
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <FileText className="mr-2" />Quizzes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <FileText className="mr-2" />PastPapers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <FileText className="mr-2" />Answers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <Bell className="mr-2" />Notification
              </a>
            </li>
          </ul>
        </nav>

        <hr className="my-24" />

        <div>
          <ul>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <HelpCircle className="mr-2" />Help Center
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <MessageSquare className="mr-2" />Feedback
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900 rounded">
              <User className="mr-2" />Profile
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
      <div className="flex-grow p-8 bg-gray-100 relative">
        <h1 className="text-3xl font-bold text-indigo-800 mb-20">Quizzes</h1>
        <h2 className="text-3xl font-semibold text-indigo-800 mb-8 pl-60">Welcome to the maths quiz</h2>
        <h2 className="text-3xl font-semibold text-blue-500 mb-8">Instruction:</h2>

        {/* Instruction List */}
        <ol className=" space-y-4  list-none">
          <li>
    <span className="font-bold text-3xl p-8">1.</span>You have 1hr to answer the 50 mcqs.
  </li>
  <li >
  <span className="font-bold text-3xl p-8">2.</span>Recommended to be in a calm area with a bottle of water to take the quiz.
  </li>
  <li>
  <span  className="font-bold text-3xl p-8">3.</span>These mcqs are all gce past questions.
  </li>
  <li>
  <span  className="font-bold text-3xl p-8">4.</span>Result will be displayed at the end of the quiz.
  </li>
</ol>


        {/* Start Quiz Button */}
        <div className='flex justify-end '>
  <button className='flex items-center gap-2 mt-8 text-2xl text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-800'>
    Start Quiz 
    <ArrowRight className="w-6 h-6"/>
  </button>
</div>

        
        
        {/* JP Badge */}
        <div className="absolute top-4 right-4 bg-indigo-800 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center">
          JP
        </div>
      </div>
    </div>
  );
}
