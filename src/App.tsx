import React, { useState } from 'react';
    import Sidebar from './components/Sidebar';
    import StudentDashboard from './components/StudentDashboard';
    import TeacherDashboard from './components/TeacherDashboard';
    import CourseList from './components/CourseList';
    import AssignmentList from './components/AssignmentList';

    const App: React.FC = () => {
      const [role, setRole] = useState<'student' | 'teacher'>('student');
      const [currentPath, setCurrentPath] = useState('/');

      // Dummy data for courses and assignments
      const courses = [
        { id: 1, title: 'Introduction to React', description: 'Learn the basics of React', instructor: 'Jane Doe', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80' },
        { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript concepts', instructor: 'John Smith', image: 'https://images.unsplash.com/photo-1555099962-4199c7d57e4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { id: 3, title: 'Data Structures and Algorithms', description: 'Master DSA for interviews', instructor: 'Alice Brown', image: 'https://images.unsplash.com/photo-1596495578065-6e48a03fc2de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }
      ];

      const assignments = [
        { id: 1, title: 'React Basics Assignment', course: 'Introduction to React', dueDate: '2024-05-10', description: 'Create a simple component' },
        { id: 2, title: 'JS Closures Exercise', course: 'Advanced JavaScript', dueDate: '2024-05-15', description: 'Implement closure examples' },
      ];

      const handleNavigate = (path: string) => {
        setCurrentPath(path);
      };

      const toggleRole = () => {
        setRole(role === 'student' ? 'teacher' : 'student');
        setCurrentPath('/'); // Reset path on role change
      };

      return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Sidebar role={role} onNavigate={handleNavigate} />
          <div className="flex-1 p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">
                {currentPath === '/'
                  ? role === 'student'
                    ? 'Student Dashboard'
                    : 'Teacher Dashboard'
                  : currentPath.slice(1).toUpperCase()}
              </h1>
              <button
                onClick={toggleRole}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Switch to {role === 'student' ? 'Teacher' : 'Student'}
              </button>
            </div>

            {currentPath === '/' && role === 'student' && <StudentDashboard />}
            {currentPath === '/' && role === 'teacher' && <TeacherDashboard />}
            {currentPath === '/courses' && <CourseList courses={courses} />}
            {currentPath === '/assignments' && <AssignmentList assignments={assignments} />}
            {/* Add routes for /students, /grading, and settings as needed */}
          </div>
        </div>
      );
    };

    export default App;
