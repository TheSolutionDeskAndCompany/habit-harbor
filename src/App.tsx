import { HabitsProvider } from './contexts/HabitsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HabitTracker from './components/HabitTracker';
import './App.css';

function HabitTracker() {
  const { habits, addHabit, updateHabit, toggleHabitCompletion, deleteHabit } = useHabits();
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
    addHabit(newHabit.trim());
    setNewHabit('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>
          <form onSubmit={handleAddHabit} className="flex gap-2">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Enter a new habit"
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Habit
            </button>
          </form>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Habit</th>
                  {weekDays.map((day) => (
                    <th key={day.toString()} className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {format(day, 'EEE')}<br />
                      <span className="text-sm">{format(day, 'd')}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {habits.map((habit) => (
                  <tr key={habit.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <HabitCard
                        habit={habit}
                        selectedDate={selectedDate}
                        onToggle={(date) => toggleHabitCompletion(habit.id, date)}
                        onEdit={() => handleEditHabit(habit)}
                        onDelete={() => {
                          if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
                            deleteHabit(habit.id);
                          }
                        }}
                      />
                          </button>
                          <button
                            onClick={() => deleteHabit(habit.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                            aria-label={`Delete ${habit.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                    {weekDays.map((day) => (
                      <td key={day.toString()} className="px-3 py-4 whitespace-nowrap text-center">
                        <button 
                          className={`w-8 h-8 rounded-full border-2 transition-colors ${
                            habit.records.some(r => r.date === format(day, 'yyyy-MM-dd') && r.completed)
                              ? 'bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600'
                              : 'border-gray-300 dark:border-gray-600 hover:border-green-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => toggleHabitCompletion(habit.id, day)}
                          aria-label={`Mark ${habit.name} as ${
                            habit.records.some(r => r.date === format(day, 'yyyy-MM-dd') && r.completed) 
                              ? 'not completed' 
                              : 'completed'
                          } for ${format(day, 'MMMM d, yyyy')}`}
                        >
                          {habit.records.some(r => r.date === format(day, 'yyyy-MM-dd') && r.completed) && (
                            <svg className="w-4 h-4 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
                {habits.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No habits yet. Add your first habit above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
      
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Habit Harbor - Track your habits daily</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <HabitsProvider>
        <HabitTracker />
      </HabitsProvider>
    </ThemeProvider>
  );
}

export default App
