import React from 'react'
      import { BookOpen } from 'lucide-react'

      interface Course {
        id: number
        title: string
        description: string
        instructor: string
        image: string
      }

      interface CourseListProps {
        courses: Course[]
      }

      const CourseList: React.FC<CourseListProps> = ({ courses }) => {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                  <p className="text-gray-700">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        )
      }

      export default CourseList
