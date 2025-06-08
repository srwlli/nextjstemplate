import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CounterDisplay from '../CounterDisplay';
import { useCounterStore } from '@/store/counterStore';
import { act } from 'react';

describe('CounterDisplay Component', () => {
  beforeEach(() => {
    act(() => {
      useCounterStore.getState().reset();
    });
  });

  it('renders the initial count', () => {
    render(<CounterDisplay />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments the count when Increment button is clicked', () => {
    render(<CounterDisplay />);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    fireEvent.click(incrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements the count when Decrement button is clicked', () => {
    render(<CounterDisplay />);
    const decrementButton = screen.getByRole('button', { name: /Decrement/i });
    fireEvent.click(decrementButton);
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('resets the count when Reset button is clicked', () => {
    // First, increment to a non-zero number
    act(() => {
      useCounterStore.getState().increment();
    });
    render(<CounterDisplay />);
    expect(screen.getByText('1')).toBeInTheDocument(); // Ensure it's 1 initially for this test

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);
    expect(screen.getByText('0')).toBeInTheDocument(); // Should reset to 0
  });
}); 