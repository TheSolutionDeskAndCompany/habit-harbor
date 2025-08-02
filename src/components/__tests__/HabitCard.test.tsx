import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HabitCard from '../HabitCard'
import type { Habit } from '../../contexts/HabitsContext'

const mockHabit: Habit = {
  id: '1',
  name: 'Test Habit',
  color: '#3B82F6',
  frequency: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  createdAt: new Date('2025-01-01'),
  records: [
    { id: '1', date: '2025-01-01', completed: true },
    { id: '2', date: '2025-01-02', completed: true },
    { id: '3', date: '2025-01-03', completed: false },
  ]
}

describe('HabitCard', () => {
  const mockProps = {
    habit: mockHabit,
    onToggle: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    selectedDate: new Date('2025-01-01')
  }

  it('renders habit name correctly', () => {
    render(<HabitCard {...mockProps} />)
    expect(screen.getByText('Test Habit')).toBeInTheDocument()
  })

  it('calls onToggle when habit is clicked', () => {
    render(<HabitCard {...mockProps} />)
    const habitButton = screen.getByRole('button', { name: /test habit/i })
    fireEvent.click(habitButton)
    expect(mockProps.onToggle).toHaveBeenCalledWith(mockProps.selectedDate)
  })

  it('calls onEdit when edit button is clicked', () => {
    render(<HabitCard {...mockProps} />)
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)
    expect(mockProps.onEdit).toHaveBeenCalled()
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<HabitCard {...mockProps} />)
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)
    expect(mockProps.onDelete).toHaveBeenCalled()
  })

  it('displays streak information', () => {
    render(<HabitCard {...mockProps} />)
    expect(screen.getByText(/streak/i)).toBeInTheDocument()
  })

  it('shows completion status for selected date', () => {
    render(<HabitCard {...mockProps} />)
    // Should show completed status for 2025-01-01
    expect(screen.getByRole('button', { name: /test habit/i })).toHaveClass('bg-green-500')
  })
})
