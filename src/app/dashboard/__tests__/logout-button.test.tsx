import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutButton from '../logout-button';
import { signOut } from '@/lib/auth-actions';
import { toast } from 'sonner';

// Mock the dependencies
jest.mock('@/lib/auth-actions', () => ({
  signOut: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial state', () => {
    render(<LogoutButton />);
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument();
  });

  it('shows loading state and disables button during sign out', async () => {
    // Mock a delayed signOut to test loading state
    (signOut as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: 'Sign Out' });

    fireEvent.click(button);

    // Check loading state
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Signing Out...');

    // Wait for sign out to complete
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Sign Out');
    });
  });

  it('handles sign out error and shows toast', async () => {
    const errorMessage = 'Failed to sign out';
    (signOut as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: 'Sign Out' });

    fireEvent.click(button);

    // Check loading state
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Signing Out...');

    // Wait for error handling
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Sign Out');
      expect(toast.error).toHaveBeenCalledWith('Failed to sign out', {
        description: 'Please try again or refresh the page.',
      });
    });
  });
}); 