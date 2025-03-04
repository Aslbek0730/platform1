import React from 'react';
import AITestGenerator from './AITestGenerator';

const TeacherDashboard: React.FC = () => {
  // Dummy data (same as before)
  const students = [
    { id: 1, name: 'Alice', performance: 'A' },
    { id: 2, name: 'Bob', performance: 'B' },
    { id: 3, name: 'Charlie', performance: 'C' },
  ];
  const submittedAssignments = [
    { id: 1, student: 'Alice', course: 'Math 101', title: 'Quiz 2' },
    { id: 2, student: 'Bob', course: 'History 101', title: 'Essay' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Student Performance</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id} className="mb-1">
                {student.name} - {student.performance}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Submitted Assignments</h2>
          <ul>
            {submittedAssignments.map((assignment) => (
              <li key={assignment.id} className="mb-1">
                {assignment.student} - {assignment.course} - {assignment.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Course Management</h2>
        <p>Options to create, edit, and delete courses.</p>
      </div>

      {/* Add the AITestGenerator component here */}
      <div className="mt-4">
        <AITestGenerator />
      </div>
    </div>
  );
};

export default TeacherDashboard;
