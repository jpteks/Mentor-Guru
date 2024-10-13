"use client";
import { Home as HomeIcon,
    Book,
    FileText,
    Bell,
    HelpCircle,
    MessageSquare,
    User,
    LogOut,
    ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function QuizPage() {
  const [selectedOption, setSelectedOption] = useState("");
  
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
      <div className="flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-800">Quizzes</h1>
          <div className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center mt-24">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-xl font-bold">00:58:24</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">2. If the roots of the quadratic equation px²-qx-r=0 are real then</h2>
            <div className="space-y-4">
              {/* Option A */}
              <button 
                className={`block w-full p-4 border rounded-lg ${selectedOption === 'a' ? 'bg-blue-700 text-white' : 'border-gray-300 text-black'}`}
                onClick={() => setSelectedOption('a')}
              >
                a) q² - 4pr ≥ 0
              </button>
              {/* Option B */}
              <button 
                className={`block w-full p-4 border rounded-lg ${selectedOption === 'b' ? 'bg-blue-700 text-white' : 'border-gray-300 text-black'}`}
                onClick={() => setSelectedOption('b')}
              >
                b) q² + 4pr = 0
              </button>
              {/* Option C */}
              <button 
                className={`block w-full p-4 border rounded-lg ${selectedOption === 'c' ? 'bg-blue-700 text-white' : 'border-gray-300 text-black'}`}
                onClick={() => setSelectedOption('c')}
              >
                c) q² + 4p > 0
              </button>
              {/* Option D */}
              <button 
                className={`block w-full p-4 border rounded-lg ${selectedOption === 'd' ? 'bg-blue-700 text-white' : 'border-gray-300 text-black'}`}
                onClick={() => setSelectedOption('d')}
              >
                d) q² - 4pr > 0
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 " size="lg">
              <ArrowLeft className="mr-2" /> Previous
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600" size="lg">
              Next <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* JP Badge */}
      <div className="absolute top-4 right-4 bg-indigo-800 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center">
        JP
      </div>
    </div>
  );
}
