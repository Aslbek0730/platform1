import React from 'react';

    const StudentDashboard: React.FC = () => {
      // Dummy data for now
      const progress = 75;
      const upcomingAssignments = [
        { id: 1, course: 'Math 101', title: 'Quiz 3', dueDate: '2024-05-10' },
        { id: 2, course: 'History 101', title: 'Essay', dueDate: '2024-05-15' },
      ];
      const enrolledCourses = [
        { id: 1, title: 'Math 101' },
        { id: 2, title: 'History 101' },
        { id: 3, title: 'Science 101' },
      ];

      return (
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Course Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2">{progress}% Complete</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Upcoming Assignments</h2>
              <ul>
                {upcomingAssignments.map((assignment) => (
                  <li key={assignment.id} className="mb-1">
                    {assignment.course} - {assignment.title} (Due: {assignment.dueDate})
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Enrolled Courses</h2>
            <ul>
              {enrolledCourses.map((course) => (
                <li key={course.id} className="mb-1">{course.title}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    export default StudentDashboard;
