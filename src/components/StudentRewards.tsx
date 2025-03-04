import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';

    interface Student {
      id: string;
      name: string;
      xp: number;
    }

    interface Badge {
      id: string;
      name: string;
      icon: string; // URL or component for the badge icon
      description: string;
      xpThreshold: number;
    }

    interface Achievement {
      studentId: string;
      badgeId: string;
      dateEarned: Date;
    }

    const StudentRewards: React.FC = () => {
      const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'Alice', xp: 1200 },
        { id: '2', name: 'Bob', xp: 950 },
        { id: '3', name: 'Charlie', xp: 1500 },
        { id: '4', name: 'David', xp: 800},
      ]);

      const [badges, setBadges] = useState<Badge[]>([
        { id: '1', name: 'Beginner', icon: '⭐️', description: 'Reach 500 XP', xpThreshold: 500 },
        { id: '2', name: 'Intermediate', icon: '🚀', description: 'Reach 1000 XP', xpThreshold: 1000 },
        { id: '3', name: 'Expert', icon: '🏆', description: 'Reach 1500 XP', xpThreshold: 1500 },
      ]);

      const [achievements, setAchievements] = useState<Achievement[]>([]);
      const [currentStudentId, setCurrentStudentId] = useState('1'); // Assume current user is Alice
      const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<Badge | null>(null);

        // Simulate real-time XP updates (for demonstration)
        useEffect(() => {
            const interval = setInterval(() => {
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student.id === currentStudentId
                            ? { ...student, xp: Math.min(student.xp + 50, 2000) } // Cap at 2000 for demo
                            : student
                    )
                );
            }, 2000); // Update every 2 seconds

            return () => clearInterval(interval);
        }, [currentStudentId]);

      // Check for new badges on XP change
      useEffect(() => {
        const currentStudent = students.find((student) => student.id === currentStudentId);
        if (currentStudent) {
          const earnedBadges = badges.filter(
            (badge) =>
              currentStudent.xp >= badge.xpThreshold &amp;&amp;
              !achievements.some(
                (achievement) =>
                  achievement.studentId === currentStudentId &amp;&amp; achievement.badgeId === badge.id
              )
          );

          if (earnedBadges.length > 0) {
            const newAchievement: Achievement = {
              studentId: currentStudentId,
              badgeId: earnedBadges[0].id,
              dateEarned: new Date(),
            };
            setAchievements([...achievements, newAchievement]);
            setNewBadgeUnlocked(earnedBadges[0]);
          }
        }
      }, [students, currentStudentId, badges, achievements]);

      const sortedStudents = [...students].sort((a, b) => b.xp - a.xp);
      const currentStudent = students.find((student) => student.id === currentStudentId);

      const closeModal = () => {
        setNewBadgeUnlocked(null);
      };

      return (
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Student Rewards &amp; Gamification</h1>

          <!-- Leaderboard -->
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
            <ol className="list-decimal list-inside">
              {sortedStudents.map((student, index) => (
                <motion.li
                  key={student.id}
                  className="mb-1 flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span>{student.name}</span>
                  <span>{student.xp} XP</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <!-- Current Student Info -->
          {currentStudent &amp;&amp; (
            <div className="bg-white p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
              <p>
                {currentStudent.name}, you have <strong>{currentStudent.xp} XP</strong>.
              </p>
              <div className="mt-2">
                <h3 className="text-md font-semibold">Badges Earned:</h3>
                <ul className="flex space-x-2">
                  {achievements
                    .filter((achievement) => achievement.studentId === currentStudentId)
                    .map((achievement) => {
                      const badge = badges.find((b) => b.id === achievement.badgeId);
                      return (
                        badge &amp;&amp; (
                          <li key={badge.id} className="flex items-center">
                            <span className="text-xl">{badge.icon}</span>
                            <span className="ml-1">{badge.name}</span>
                          </li>
                        )
                      );
                    })}
                </ul>
              </div>
            </div>
          )}

          <!-- Badge Unlock Modal -->
          <AnimatePresence>
            {newBadgeUnlocked &amp;&amp; (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-lg mb-4">
                    You've unlocked the <strong>{newBadgeUnlocked.name}</strong> badge!
                  </p>
                  <span className="text-4xl">{newBadgeUnlocked.icon}</span>
                  <p className="mt-4">{newBadgeUnlocked.description}</p>
                  <button
                    onClick={closeModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    export default StudentRewards;
