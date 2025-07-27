import { useEffect, useState } from 'react';

const quotes = [
  "Success is the sum of small efforts repeated day in and day out.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The secret of getting ahead is getting started.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "Small changes, big impact.",
  "Every day is a new opportunity to build positive habits.",
  "Consistency is the key to achieving your goals.",
  "The journey of a thousand miles begins with one step.",
];

export default function QuoteBox() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    // Change quote every 10 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex items-start">
        <div className="text-yellow-500 mr-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-700 dark:text-gray-300 italic">"{currentQuote}"</p>
      </div>
    </div>
  );
}
