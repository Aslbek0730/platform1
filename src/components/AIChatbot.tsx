import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  sender: 'user' | 'ai';
  message: string;
}

const AIChatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

    // Web Speech API - Recognition (Voice Input)
    const recognition = useRef<SpeechRecognition | null>(null);
    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.lang = 'en-US';
            recognition.current.interimResults = false; // We'll handle final results only

            recognition.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setInput(transcript);
                sendMessage(transcript); // Send the transcribed message
            };

            recognition.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognition.current.onend = () => {
                if (isListening) {
                    recognition.current?.start(); // Restart if still listening
                }
            }
        } else {
            console.warn('SpeechRecognition API not supported in this browser.');
        }

        return () => {
          recognition.current?.stop();
        }
    }, [isListening]);

    const toggleListening = () => {
        if (recognition.current) {
            if (isListening) {
                recognition.current.stop();
            } else {
                recognition.current.start();
            }
            setIsListening(!isListening);
        }
    };

  // Web Speech API - Synthesis (Voice Output)
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set the language
      speechSynthesis.speak(utterance);
    } else {
      console.warn('SpeechSynthesis API not supported in this browser.');
    }
  };

  // Simulated AI response function
  const fetchAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Basic response logic (replace with more sophisticated logic)
    if (userMessage.toLowerCase().includes('hello')) {
      return 'Hi there! How can I help you today?';
    } else if (userMessage.toLowerCase().includes('code')) {
      return '```javascript\nconsole.log("Hello, world!");\n```';
    } else {
      return "I'm still learning. I didn't understand your question.";
    }
  };

  // React Query for fetching AI response
  const { data: aiResponse, isLoading } = useQuery(
    ['aiResponse', input],  // Unique key for this query
    () => fetchAIResponse(input),
    {
      enabled: !!input, // Only run the query if there's user input
      onSuccess: (data) => {
        if (data) {
          setMessages([...messages, { sender: 'ai', message: data }]);
          speak(data); // Speak the AI response
        }
      }
    }
  );

    const sendMessage = (message: string) => {
      if (message.trim() !== '') {
          setMessages([...messages, { sender: 'user', message: message }]);
          setInput(''); // Clear input after sending
      }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      sendMessage(input);
    }
  };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  return (
    <div className="flex flex-col h-96">
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 mr-auto'
            } max-w-[70%]`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={msg.message} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center mt-2">
        <textarea
          className="flex-grow border rounded-l-lg p-2 outline-none"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
        />
        <button
          className={`p-2 rounded-r-lg ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          onClick={toggleListening}
        >
          {isListening ? 'Stop' : 'Speak'}
        </button>
      </div>
        {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default AIChatbot;
