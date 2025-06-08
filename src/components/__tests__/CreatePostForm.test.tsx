import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePostForm from '../CreatePostForm';
import { createPost } from '@/lib/post-actions';
import { toast } from 'sonner';

// Mock the dependencies
jest.mock('@/lib/post-actions', () => ({
  createPost: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('CreatePostForm', () => {
  const mockAuthorId = 'test-author-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial state', () => {
    render(<CreatePostForm authorId={mockAuthorId} />);
    
    expect(screen.getByPlaceholderText('What\'s on your mind?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Post' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('disables form elements during submission', async () => {
    // Mock a delayed createPost to test loading state
    (createPost as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<CreatePostForm authorId={mockAuthorId} />);
    
    const textarea = screen.getByPlaceholderText('What\'s on your mind?');
    const submitButton = screen.getByRole('button', { name: 'Create Post' });
    const clearButton = screen.getByRole('button', { name: 'Clear' });

    // Enter content and submit
    fireEvent.change(textarea, { target: { value: 'Test post content' } });
    fireEvent.click(submitButton);

    // Check loading state
    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Creating...');

    // Wait for submission to complete
    await waitFor(() => {
      expect(textarea).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
      expect(clearButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Create Post');
    });
  });

  it('shows error toast for empty content', () => {
    render(<CreatePostForm authorId={mockAuthorId} />);
    
    const submitButton = screen.getByRole('button', { name: 'Create Post' });
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Post cannot be empty');
    expect(createPost).not.toHaveBeenCalled();
  });

  it('handles successful post creation', async () => {
    const mockPost = { id: '1', content: 'Test post' };
    (createPost as jest.Mock).mockResolvedValueOnce({ data: mockPost });

    render(<CreatePostForm authorId={mockAuthorId} />);
    
    const textarea = screen.getByPlaceholderText('What\'s on your mind?');
    const submitButton = screen.getByRole('button', { name: 'Create Post' });

    // Enter content and submit
    fireEvent.change(textarea, { target: { value: 'Test post content' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Post created successfully');
      expect(textarea).toHaveValue('');
    });
  });

  it('handles post creation error', async () => {
    const errorMessage = 'Failed to create post';
    (createPost as jest.Mock).mockResolvedValueOnce({ error: errorMessage });

    render(<CreatePostForm authorId={mockAuthorId} />);
    
    const textarea = screen.getByPlaceholderText('What\'s on your mind?');
    const submitButton = screen.getByRole('button', { name: 'Create Post' });

    // Enter content and submit
    fireEvent.change(textarea, { target: { value: 'Test post content' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create post', {
        description: errorMessage,
      });
      expect(textarea).toHaveValue('Test post content'); // Content should remain
    });
  });

  it('clears form content when clear button is clicked', () => {
    render(<CreatePostForm authorId={mockAuthorId} />);
    
    const textarea = screen.getByPlaceholderText('What\'s on your mind?');
    const clearButton = screen.getByRole('button', { name: 'Clear' });

    // Enter content
    fireEvent.change(textarea, { target: { value: 'Test post content' } });
    expect(textarea).toHaveValue('Test post content');

    // Click clear
    fireEvent.click(clearButton);
    expect(textarea).toHaveValue('');
  });
}); 