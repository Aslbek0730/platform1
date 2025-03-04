import React, { useEffect } from 'react';
    import create from 'zustand';

    interface StudentPerformance {
      scores: { [topic: string]: number };
      progress: { [topic: string]: number }; // Percentage
    }

    interface StudyPlanItem {
      id: string;
      topic: string;
      date: Date;
      duration: number; // In minutes
      isWeakArea: boolean;
    }

    interface StudyPlanState {
      studyPlan: StudyPlanItem[];
      weakAreas: string[];
      reminders: string[]; // Simple message-based reminders
      generatePlan: (data: StudentPerformance) => void;
      addReminder: (reminder: string) => void;
      clearReminders: () => void;
    }

    const useStudyPlanStore = create<StudyPlanState>((set) => ({
      studyPlan: [],
      weakAreas: [],
      reminders: [],
      generatePlan: (data: StudentPerformance) => {
        const plan: StudyPlanItem[] = [];
        const weakAreas: string[] = [];

        // Identify weak areas (scores below a threshold, e.g., 60%)
        for (const topic in data.scores) {
          if (data.scores[topic] < 60) {
            weakAreas.push(topic);
          }
        }

        // Generate a basic schedule (prioritize weak areas)
        let currentDate = new Date();
        for (const topic of weakAreas) {
          plan.push({
            id: `${topic}-${currentDate.getTime()}`,
            topic,
            date: currentDate,
            duration: 60, // 1 hour
            isWeakArea: true,
          });
          currentDate.setDate(currentDate.getDate() + 1); // Next day
        }

        // Add other topics (simplified)
        for (const topic in data.progress) {
          if (!weakAreas.includes(topic)) {
            plan.push({
              id: `${topic}-${currentDate.getTime()}`,
              topic,
              date: currentDate,
              duration: 45, // 45 minutes
              isWeakArea: false,
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }

        set({ studyPlan: plan, weakAreas });
      },
      addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
      clearReminders: () => set({ reminders: [] }),
    }));

    const PersonalizedStudyPlan: React.FC = () => {
      const { studyPlan, weakAreas, reminders, generatePlan, addReminder, clearReminders } =
        useStudyPlanStore();

      // Example student performance data
      const studentData: StudentPerformance = {
        scores: {
          'React Basics': 75,
          'JavaScript Fundamentals': 50,
          'Data Structures': 80,
          'Algorithms': 40,
        },
        progress: {
          'React Basics': 80,
          'JavaScript Fundamentals': 60,
          'Data Structures': 90,
          'Algorithms': 30,
        },
      };

      useEffect(() => {
        generatePlan(studentData);

        // Set up a reminder (example)
        addReminder('Review JavaScript Fundamentals tomorrow!');

        // Clean up reminders after a while (optional)
        const timeoutId = setTimeout(() => {
          clearReminders();
        }, 5000); // Clear after 5 seconds

        return () => clearTimeout(timeoutId);
      }, []);

      return (
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Personalized Study Plan</h1>

          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Study Schedule</h2>
            <ul>
              {studyPlan.map((item) => (
                <li
                  key={item.id}
                  className={`mb-1 ${item.isWeakArea ? 'text-red-600' : ''}`}
                >
                  {item.date.toLocaleDateString()}: {item.topic} ({item.duration} minutes)
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Weak Areas</h2>
            <ul>
              {weakAreas.map((area) => (
                <li key={area} className="text-red-600">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Reminders</h2>
            <ul>
              {reminders.map((reminder, index) => (
                <li key={index} className="text-blue-600">
                  {reminder}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    export default PersonalizedStudyPlan;
