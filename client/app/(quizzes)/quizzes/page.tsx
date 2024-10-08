import {
    Home as HomeIcon,
    Book,
    Zap,
    FileText,
    Bell,
    HelpCircle,
    User,
    LogOut,
    MessageSquare
     
  } from 'lucide-react';

export default function QuizzesPage() {
  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white flex flex-col p-6">
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
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <HomeIcon className="mr-2" />Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                Quizzes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                PastPapers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                Answers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
                Notification
              </a>
            </li>
          </ul>
        </nav>

        <hr className="my-24" />

        <div>
          <ul>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
               Help Center
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              Feedback
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <User className="mr-2" />Profile
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <LogOut className="mr-2" />Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100 relative">
        <h1 className="text-3xl font-bold text-purple-800 mb-16">Quizzes</h1>

        {/* JP Badge */}
        <div className='absolute top-4 right-4 bg-blue-700 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center'>
          JP
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white">
            <div className="bg-gray-300 rounded-full p-2 mr-4">
              <Zap className="text-blue-600" />
            </div>
            <p className="font-semibold">O Level Normal Quizz</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white">
            <div className="bg-gray-300 rounded-full p-2 mr-4">
              <Zap className="text-blue-600" />
            </div>
            <p className="font-semibold">A Level Normal Quizz</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white">
            <div className="bg-gray-300 rounded-full p-2 mr-4">
              <Zap className="text-blue-600" />
            </div>
            <p className="font-semibold">O Level Competition Quizz</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white">
            <div className="bg-gray-300 rounded-full p-2 mr-4">
              <Zap className="text-blue-600" />
            </div>
            <p className="font-semibold">A Level Competition Quizz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
