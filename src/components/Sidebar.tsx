import React from 'react';
    import { Home, Book, User, Users, CheckCircle, Settings } from 'lucide-react';

    interface SidebarProps {
      role: 'student' | 'teacher';
      onNavigate: (path: string) => void;
    }

    const Sidebar: React.FC<SidebarProps> = ({ role, onNavigate }) => {
      return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
          <div className="flex items-center mb-6">
            <Book className="mr-2" />
            <span className="text-lg font-semibold">LearnDash</span>
          </div>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => onNavigate('/')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-700"
              >
                <Home className="mr-2" />
                Dashboard
              </button>
            </li>
            {role === 'student' && (
              <>
                <li className="mb-2">
                  <button
                    onClick={() => onNavigate('/courses')}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                  >
                    <Book className="mr-2" />
                    My Courses
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => onNavigate('/assignments')}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                  >
                    <CheckCircle className="mr-2" />
                    Assignments
                  </button>
                </li>
              </>
            )}
            {role === 'teacher' && (
              <>
                <li className="mb-2">
                  <button
                    onClick={() => onNavigate('/students')}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                  >
                    <Users className="mr-2" />
                    Students
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => onNavigate('/grading')}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                  >
                    <CheckCircle className="mr-2" />
                    Grading
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => onNavigate('/courses')}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                  >
                    <Book className="mr-2" />
                    Course Management
                  </button>
                </li>
              </>
            )}
              <li className="mb-2">
                <button
                  onClick={() => onNavigate('/settings')}
                  className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                >
                  <Settings className="mr-2" />
                  Settings
                </button>
              </li>
          </ul>
        </div>
      );
    };

    export default Sidebar;
