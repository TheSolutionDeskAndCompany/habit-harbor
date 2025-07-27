import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { format } from 'date-fns';

// Types
export type Habit = {
  id: string;
  name: string;
  color: string;
  frequency: string[];
  createdAt: Date;
  records: HabitRecord[];
};

export type HabitRecord = {
  id: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
};

type HabitsContextType = {
  habits: Habit[];
  addHabit: (name: string) => void;
  updateHabit: (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt' | 'records'>>) => void;
  toggleHabitCompletion: (habitId: string, date: Date) => void;
  deleteHabit: (habitId: string) => void;
};

const HABITS_STORAGE_KEY = 'habit-harbor-data';

// Helper function to safely parse JSON with error handling
const safeJsonParse = <T,>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
};

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

type HabitsProviderProps = {
  children: ReactNode;
};



export function HabitsProvider({ children }: HabitsProviderProps) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    // Load habits from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(HABITS_STORAGE_KEY);
      return savedData ? safeJsonParse<Habit[]>(savedData, []) : [];
    }
    return [];
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [habits]);

  const addHabit = (name: string) => {
    if (!name.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: name.trim(),
      color: 'blue-500',
      frequency: ['Mon', 'Wed', 'Fri'],
      createdAt: new Date(),
      records: []
    };
    
    setHabits([...habits, habit]);
  };

  const updateHabit = (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt' | 'records'>>) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const toggleHabitCompletion = (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    setHabits(habits.map(habit => {
      if (habit.id !== habitId) return habit;
      
      // Check if record already exists for this date
      const recordIndex = habit.records.findIndex(r => r.date === dateStr);
      
      if (recordIndex >= 0) {
        // Toggle completion status
        const updatedRecords = [...habit.records];
        updatedRecords[recordIndex] = {
          ...updatedRecords[recordIndex],
          completed: !updatedRecords[recordIndex].completed
        };
        
        return { ...habit, records: updatedRecords };
      } else {
        // Add new record
        return {
          ...habit,
          records: [
            ...habit.records,
            {
              id: `${habitId}-${dateStr}`,
              date: dateStr,
              completed: true
            }
          ]
        };
      }
    }));
  };

  const deleteHabit = (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== habitId));
    }
  };

  return (
    <HabitsContext.Provider 
      value={{
        habits,
        addHabit,
        updateHabit,
        toggleHabitCompletion,
        deleteHabit
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}


