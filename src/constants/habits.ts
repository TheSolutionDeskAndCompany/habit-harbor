import { Habit } from '../contexts/HabitsContext';

export const colorOptions = [
  { value: 'blue-500', label: 'Blue', bg: 'bg-blue-500' },
  { value: 'green-500', label: 'Green', bg: 'bg-green-500' },
  { value: 'red-500', label: 'Red', bg: 'bg-red-500' },
  { value: 'yellow-500', label: 'Yellow', bg: 'bg-yellow-500' },
  { value: 'purple-500', label: 'Purple', bg: 'bg-purple-500' },
  { value: 'pink-500', label: 'Pink', bg: 'bg-pink-500' },
  { value: 'indigo-500', label: 'Indigo', bg: 'bg-indigo-500' },
  { value: 'teal-500', label: 'Teal', bg: 'bg-teal-500' },
] as const;

export const frequencyOptions = [
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' },
  { value: 'Sun', label: 'Sunday' },
] as const;

export const defaultHabit: Omit<Habit, 'id' | 'createdAt'> = {
  name: '',
  color: 'blue-500',
  frequency: ['Mon', 'Wed', 'Fri'],
  records: [],
};
