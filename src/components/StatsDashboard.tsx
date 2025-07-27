import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Habit } from '../contexts/HabitsContext';
import { format, startOfWeek, addDays, isWithinInterval, isSameDay } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type StatsDashboardProps = {
  habits: Habit[];
  selectedDate: Date;
};

export default function StatsDashboard({ habits, selectedDate }: StatsDashboardProps) {
  // Calculate weekly completion rate
  const weeklyStats = useMemo(() => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Calculate completion rate for each day of the week
    const completionData = weekDays.map((day, index) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayHabits = habits.filter(habit => 
        habit.frequency.includes(days[day.getDay()])
      );
      
      if (dayHabits.length === 0) return 0;
      
      const completedHabits = dayHabits.filter(habit => 
        habit.records.some(record => 
          record.date === dayStr && record.completed
        )
      ).length;
      
      return Math.round((completedHabits / dayHabits.length) * 100);
    });
    
    return {
      labels: weekDays.map(day => format(day, 'EEE')),
      datasets: [
        {
          label: 'Completion Rate (%)',
          data: completionData,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [habits, selectedDate]);
  
  // Calculate habit completion rates
  const habitStats = useMemo(() => {
    return habits.map(habit => {
      const totalDays = habit.records.length;
      if (totalDays === 0) return { ...habit, completionRate: 0 };
      
      const completedDays = habit.records.filter(record => record.completed).length;
      const completionRate = Math.round((completedDays / totalDays) * 100);
      
      return {
        ...habit,
        completionRate,
        completedDays,
        totalDays,
      };
    }).sort((a, b) => b.completionRate - a.completionRate);
  }, [habits]);
  
  // Chart options
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Completion Rate',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Completion Rate (%)',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Habit Statistics</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Weekly Overview</h3>
        <div className="h-64">
          <Bar data={weeklyStats} options={chartOptions} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Habit Performance</h3>
        <div className="space-y-4">
          {habitStats.map(habit => (
            <div key={habit.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">{habit.name}</span>
                <span className="text-sm font-medium">{habit.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getCompletionColor(habit.completionRate)}`}
                  style={{ width: `${habit.completionRate}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {habit.completedDays} of {habit.totalDays} days completed
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to determine progress bar color based on completion rate
function getCompletionColor(rate: number): string {
  if (rate >= 80) return 'bg-green-500';
  if (rate >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}
