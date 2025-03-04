import React from 'react';
      import { FileText } from 'lucide-react';

      interface Assignment {
        id: number;
        title: string;
        course: string;
        dueDate: string;
        description: string;
      }

      interface AssignmentListProps {
        assignments: Assignment[];
      }

      const AssignmentList: React.FC<AssignmentListProps> = ({ assignments }) => {
        return (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Assignments</h2>
            <ul>
              {assignments.map((assignment) => (
                <li key={assignment.id} className="border-b py-2">
                  <div className="flex items-center">
                    <FileText className="mr-2" />
                    <div>
                      <h3 className="text-lg font-medium">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.course} - Due: {assignment.dueDate}</p>
                      <p className="text-gray-700">{assignment.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      };

      export default AssignmentList;
