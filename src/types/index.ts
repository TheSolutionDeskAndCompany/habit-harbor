export interface HabitRecord {
  id: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  color: string;
  frequency: string[];
  createdAt: Date;
  records: HabitRecord[];
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface HabitsContextType {
  habits: Habit[];
  addHabit: (name: string) => void;
  updateHabit: (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt' | 'records'>>) => void;
  toggleHabitCompletion: (habitId: string, date: Date) => void;
  deleteHabit: (habitId: string) => void;
}
