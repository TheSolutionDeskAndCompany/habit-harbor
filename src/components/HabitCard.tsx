import { format, isToday, isYesterday, subDays, isSameDay } from 'date-fns';
import { Habit } from '../contexts/HabitsContext';

type HabitCardProps = {
  habit: Habit;
  onToggle: (date: Date) => void;
  onEdit: () => void;
  onDelete: () => void;
  selectedDate: Date;
};

export default function HabitCard({ habit, onToggle, onEdit, onDelete, selectedDate }: HabitCardProps) {
  // Calculate current streak
  const calculateStreak = () => {
    if (habit.records.length === 0) return 0;
    
    // Sort records by date in descending order
    const sortedRecords = [...habit.records]
      .filter(record => record.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (sortedRecords.length === 0) return 0;
    
    // Check if the most recent record is today or yesterday
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    
    let streak = 0;
    let currentDate = new Date();
    
    if (sortedRecords[0].date === today) {
      streak = 1;
      currentDate = subDays(currentDate, 1);
    } else if (sortedRecords[0].date === yesterday) {
      streak = 1;
      currentDate = subDays(currentDate, 2);
    } else {
      return 0; // No recent completion
    }
    
    // Check previous days
    for (let i = 1; i < sortedRecords.length; i++) {
      const recordDate = new Date(sortedRecords[i].date);
      const expectedDate = format(currentDate, 'yyyy-MM-dd');
      
      if (format(recordDate, 'yyyy-MM-dd') === expectedDate) {
        streak++;
        currentDate = subDays(currentDate, 1);
      } else {
        break; // Streak broken
      }
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  const isCompletedToday = habit.records.some(
    record => 
      format(new Date(record.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && 
      record.completed
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className={`text-lg font-medium ${isCompletedToday ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {habit.name}
            </h3>
            {streak > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                🔥 {streak} day{streak > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-1 bg-${habit.color}`}></span>
              {habit.frequency.join(', ')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggle(selectedDate)}
            className={`p-2 rounded-md ${isCompletedToday 
              ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
            aria-label={isCompletedToday ? 'Mark as not completed' : 'Mark as completed'}
          >
            {isCompletedToday ? '✓' : '○'}
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md"
            aria-label={`Edit ${habit.name}`}
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md"
            aria-label={`Delete ${habit.name}`}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
