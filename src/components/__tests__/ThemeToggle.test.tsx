import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ThemeToggle from '../ThemeToggle'
import { ThemeProvider } from '../../contexts/ThemeContext'

// Mock the ThemeContext
const mockToggleTheme = vi.fn()

vi.mock('../../contexts/ThemeContext', async () => {
  const actual = await vi.importActual('../../contexts/ThemeContext')
  return {
    ...actual,
    useTheme: () => ({
      theme: 'light',
      toggleTheme: mockToggleTheme
    })
  }
})

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('calls toggleTheme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(toggleButton)
    expect(mockToggleTheme).toHaveBeenCalled()
  })
})
