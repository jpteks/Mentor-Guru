"use client";
import { Home as HomeIcon,
    Book,
    FileText,
    Bell,
    HelpCircle,
    MessageSquare,
    User,
    LogOut,
     } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuizResultPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6">
        <div className="mb-8 flex items-center">
          <div className="bg-white p-2 rounded-md">
            <img src="/logo.png" alt="Mentor Guru Logo" width={40} height={40} />
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
              <a href="#" className="flex items-center px-4 py-2 hover:bg-indigo-900rounded">
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
      <div className="flex-grow p-8 mt-48">
        <div className="flex justify-center items-center flex-col">
          <div className="bg-blue-600 rounded-full w-40 h-40 flex items-center  justify-center text-white text-4xl font-bold">
            39/50
          </div>
          <h2 className="mt-4 text-4xl font-bold text-gray-800">Good</h2>
          <p className="text-xl text-gray-600 mt-2 text-center">
            Congrats, you are on the right track, scoring an A grade at the GCE
          </p>
          <h3 className="mt-8 text-2xl font-bold text-gray-800">Keep up</h3>
        </div>
      </div>

      {/* JP Badge */}
      <div className="absolute top-4 right-4 bg-indigo-800 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center">
        JP
      </div>
    </div>
  );
}
