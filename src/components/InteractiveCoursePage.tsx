import React, { useState } from 'react';
    import { ChevronDown, ChevronUp, File, Link, CheckCircle } from 'lucide-react';

    interface InteractiveCoursePageProps {
      courseTitle: string;
      videoUrl: string;
      resources: { title: string; url: string; type: 'pdf' | 'link' }[];
      quiz: {
        questions: {
          question: string;
          options: string[];
          correctAnswer: number;
        }[];
      };
      progress: number;
    }

    const InteractiveCoursePage: React.FC<InteractiveCoursePageProps> = ({
      courseTitle,
      videoUrl,
      resources,
      quiz,
      progress,
    }) => {
      const [isResourcesOpen, setIsResourcesOpen] = useState(false);
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
        Array(quiz.questions.length).fill(null)
      );
      const [quizSubmitted, setQuizSubmitted] = useState(false);

      const handleAnswerSelect = (optionIndex: number) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = optionIndex;
        setUserAnswers(updatedAnswers);
      };

      const handleNextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      };

      const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
        }
      };

      const handleSubmitQuiz = () => {
        setQuizSubmitted(true);
      };

      const calculateScore = () => {
        let correct = 0;
        userAnswers.forEach((answer, index) => {
          if (answer === quiz.questions[index].correctAnswer) {
            correct++;
          }
        });
        return correct;
      };

      return (
        <div className="bg-white rounded-lg shadow p-4">
          <h1 className="text-2xl font-semibold mb-4">{courseTitle}</h1>

          <div className="mb-4">
            <video
              controls
              width="100%"
              className="rounded"
              src={videoUrl} // Replace with your video URL
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2">{progress}% Complete</p>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center justify-between w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <span className="font-semibold">Additional Resources</span>
              {isResourcesOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isResourcesOpen && (
              <ul className="mt-2">
                {resources.map((resource, index) => (
                  <li key={index} className="mb-1 flex items-center">
                    {resource.type === 'pdf' ? <File className="mr-2" /> : <Link className="mr-2" />}
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Quiz</h2>
            {quizSubmitted ? (
              <div>
                <p>
                  You scored {calculateScore()} out of {quiz.questions.length}
                </p>
                {quiz.questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{question.question}</p>
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          className={
                            optionIndex === question.correctAnswer
                              ? 'text-green-600'
                              : optionIndex === userAnswers[index]
                              ? 'text-red-600'
                              : ''
                          }
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="font-semibold">{quiz.questions[currentQuestion].question}</p>
                <ul className="mt-2">
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                    <li key={index} className="mb-1">
                      <button
                        onClick={() => handleAnswerSelect(index)}
                        className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                          userAnswers[currentQuestion] === index ? 'bg-blue-100' : ''
                        }`}
                      >
                        {userAnswers[currentQuestion] === index && <CheckCircle className="mr-2" />}
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === quiz.questions.length - 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <button
                  onClick={handleSubmitQuiz}
                  className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };

    export default InteractiveCoursePage;
