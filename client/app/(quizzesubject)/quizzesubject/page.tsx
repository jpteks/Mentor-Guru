import { Zap, Home as HomeIcon,
    Book,
    FileText,
    Bell,
    HelpCircle,
    MessageSquare,
    User,
    LogOut, } from "lucide-react";

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
                <Book className="mr-2" />Courses
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <FileText className="mr-2" />Quizzes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <FileText className="mr-2" />PastPapers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <FileText className="mr-2" />Answers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <Bell className="mr-2" />Notification
              </a>
            </li>
          </ul>
        </nav>

        <hr className="my-24" />

        <div>
          <ul>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <HelpCircle className="mr-2" />Help Center
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <MessageSquare className="mr-2" />Feedback
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-purple-700 rounded">
              <User className="mr-2" />Profile
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
      <div className="flex-grow p-8 ">
        <h1 className="text-3xl font-bold text-purple-800 mb-16">Quizzes</h1>

        {/* JP Badge */}
        <div className='absolute top-4 right-4 bg-blue-700 text-white font-bold text-5xl w-20 h-20 rounded-full flex items-center justify-center'>
          JP
        </div>

        {/* Quiz List */}
        <div className="space-y-4 ">
          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600 " />
              </div>
              <p className="font-semibold text-lg">Mathematics</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600" />
              </div>
              <p className="font-semibold text-lg">English</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600" />
              </div>
              <p className="font-semibold text-lg">History</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600" />
              </div>
              <p className="font-semibold text-lg">Physics</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600" />
              </div>
              <p className="font-semibold text-lg">Chemistry</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600" />
              </div>
              <p className="font-semibold text-lg">Economics</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 flex items-center text-white justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-4">
                <Zap className="text-blue-600" />
              </div>
              <p className="font-semibold text-lg">Accounting</p>
            </div>
            <p className="font-semibold">0580</p>
          </div>
        </div>
      </div>
    </div>
  );
}
