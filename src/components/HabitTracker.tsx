import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { useHabits, type Habit } from '../contexts/HabitsContext';
import EditHabitModal from './EditHabitModal';
import HabitCard from './HabitCard';
import StatsDashboard from './StatsDashboard';
import ThemeToggle from './ThemeToggle';
import QuoteBox from './QuoteBox';

export default function HabitTracker() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const [newHabit, setNewHabit] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showStats, setShowStats] = useState(false);
  
  // Generate dates for the current week starting on Monday
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    
    addHabit({
      id: Date.now().toString(),
      name: newHabit.trim(),
      color: 'blue-500',
      frequency: ['Mon', 'Wed', 'Fri'],
      records: [],
      createdAt: new Date().toISOString(),
    });
    
    setNewHabit('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Habit Tracker</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <QuoteBox />
        
        {/* Week Navigation */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Today
              </button>
            </div>
          </div>
          
          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {weekDays.map((day) => (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`py-2 rounded-md ${
                  isSameDay(day, selectedDate) 
                    ? 'bg-blue-500 text-white' 
                    : isSameDay(day, new Date()) 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-xs font-medium">{format(day, 'EEE')}</div>
                <div className={`mt-1 text-lg font-medium ${isSameDay(day, new Date()) ? 'font-bold' : ''}`}>
                  {format(day, 'd')}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Stats Dashboard */}
        {showStats && (
          <div className="mb-8">
            <StatsDashboard habits={habits} selectedDate={selectedDate} />
          </div>
        )}
        
        {/* Add Habit Form */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <form onSubmit={handleAddHabit} className="flex gap-2">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Habit
            </button>
          </form>
        </div>
        
        {/* Habits List */}
        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400">
                No habits yet. Add your first habit to get started!
              </p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                selectedDate={selectedDate}
                onToggle={(date) => toggleHabitCompletion(habit.id, date)}
                onEdit={() => setEditingHabit(habit)}
                onDelete={() => {
                  if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
                    deleteHabit(habit.id);
                  }
                }}
              />
            ))
          )}
        </div>
        
        {/* Edit Habit Modal */}
        {editingHabit && (
          <EditHabitModal
            isOpen={!!editingHabit}
            onClose={() => setEditingHabit(null)}
            habit={editingHabit}
            onSave={(updates) => {
              if (editingHabit) {
                updateHabit(editingHabit.id, updates);
              }
              setEditingHabit(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
