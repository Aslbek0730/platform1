import React, { useState } from 'react';

interface Question {
  id: number;
  type: 'mcq' | 'written';
  text: string;
  options?: string[]; // Only for mcq
  correctAnswer?: number; // Index of the correct option, only for mcq
  answer?: string; // For written questions
}

const AITestGenerator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const generateMCQ = () => {
    // Simulate AI question generation
    const newQuestion: Question = {
      id: questions.length + 1,
      type: 'mcq',
      text: `Generated MCQ for ${subject} (${difficulty})`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: Math.floor(Math.random() * 4), // Random correct answer
    };
    setQuestions([...questions, newQuestion]);
  };

  const generateWrittenQuestion = () => {
    // Simulate AI question generation
    const newQuestion: Question = {
      id: questions.length + 1,
      type: 'written',
      text: `Generated Written Question for ${subject} (${difficulty})`,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleAnswerChange = (id: number, answer: string | number) => {
      const updatedQuestions = questions.map(q => {
          if (q.id === id) {
              if (q.type === 'mcq') {
                  return { ...q, correctAnswer: Number(answer) };
              } else {
                  return { ...q, answer: String(answer) };
              }
          }
          return q;
      });
      setQuestions(updatedQuestions);
  }

    const autoGrade = () => {
        let score = 0;
        questions.forEach(q => {
            if (q.type === 'mcq' && q.correctAnswer !== undefined) {
                // Assuming a student's answer is stored somewhere, compare it here.
                // For this example, we'll just check against the correct answer.
                const studentAnswer = q.correctAnswer; // In a real app, get this from student input
                if (studentAnswer === q.correctAnswer) {
                    score++;
                }
            }
        });
        alert(`Score: ${score}/${questions.filter(q => q.type === 'mcq').length}`); // Very basic feedback
    };

  const saveTest = () => {
    // Simulate saving the test
    console.log('Test Saved:', { subject, difficulty, questions });
    // In a real application, you would send this data to a backend
  };

    const editQuestion = (id: number, newText: string) => {
        const updatedQuestions = questions.map(q => {
            if (q.id === id) {
                return { ...q, text: newText };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">AI Test Generator</h1>

      <div className="mb-4">
        <label htmlFor="subject"  className="block text-sm font-medium text-gray-700">Subject:</label>
        <input
          id="subject"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty:</label>
        <input
          id="difficulty"
          type="text"
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={generateMCQ}>
          Generate MCQ
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={generateWrittenQuestion}>
          Generate Written Question
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Generated Questions:</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="mb-2 p-2 border rounded">
              <p>
                <strong>{question.type === 'mcq' ? 'MCQ' : 'Written'}: </strong>
                <input type="text" value={question.text} onChange={(e) => editQuestion(question.id, e.target.value)} className="border p-1 rounded"/>
                </p>
              {question.type === 'mcq' && question.options && (
                <div>
                  {question.options.map((option, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`option-${question.id}-${index}`}
                        name={`question-${question.id}`}
                        value={index}
                        checked={question.correctAnswer === index}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                      <label htmlFor={`option-${question.id}-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={saveTest}>
          Save Test
        </button>
         <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={autoGrade}>
          Auto Grade (MCQ)
        </button>
      </div>
    </div>
  );
};

export default AITestGenerator;
