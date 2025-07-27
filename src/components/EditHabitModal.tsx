import { useState, useEffect } from 'react';
import type { Habit } from '../contexts/HabitsContext';
import { colorOptions, frequencyOptions } from '../constants/habits';

type EditHabitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit | null;
  onSave: (updates: { name: string; color: string; frequency: string[] }) => void;
};

export default function EditHabitModal({ isOpen, onClose, habit, onSave }: EditHabitModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue-500');
  const [frequency, setFrequency] = useState<string[]>([]);

  // Update form when habit prop changes
  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setColor(habit.color);
      setFrequency([...habit.frequency]);
    }
  }, [habit]);

  if (!isOpen || !habit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, color, frequency });
    onClose();
  };

  const toggleDay = (day: string) => {
    setFrequency(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };
  
  // Color is set directly in the color picker's onChange handler

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Habit</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Habit Name
            </label>
            <input
              type="text"
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full ${option.bg} ${color === option.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  aria-label={`Select ${option.label} color`}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frequency
            </label>
            <div className="grid grid-cols-7 gap-2">
              {frequencyOptions.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleDay(value)}
                  className={`py-2 px-1 text-xs rounded-md ${
                    frequency.includes(value)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  title={label}
                >
                  {value[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
