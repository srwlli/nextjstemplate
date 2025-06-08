import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostList from '../PostList';
import { getPosts } from '@/lib/post-actions';

// Mock the dependencies
jest.mock('@/lib/post-actions', () => ({
  getPosts: jest.fn(),
}));

describe('PostList', () => {
  const mockPosts = [
    {
      id: '1',
      content: 'Test post 1',
      author: { id: 'user1', email: 'user1@test.com' },
      created_at: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      content: 'Test post 2',
      author: { id: 'user2', email: 'user2@test.com' },
      created_at: '2024-01-02T00:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    // Mock a delayed getPosts to test loading state
    (getPosts as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<PostList />);
    
    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });

  it('displays posts when data is loaded', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: mockPosts });

    render(<PostList />);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText('Test post 1')).toBeInTheDocument();
      expect(screen.getByText('Test post 2')).toBeInTheDocument();
    });

    // Check that loading state is removed
    expect(screen.queryByText('Loading posts...')).not.toBeInTheDocument();
  });

  it('shows error message when posts fail to load', async () => {
    const errorMessage = 'Failed to load posts';
    (getPosts as jest.Mock).mockResolvedValueOnce({ error: errorMessage });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading posts')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows empty state when no posts are available', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText('No posts yet')).toBeInTheDocument();
      expect(screen.getByText('Be the first to share something!')).toBeInTheDocument();
    });
  });

  it('displays post metadata correctly', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: mockPosts });

    render(<PostList />);

    await waitFor(() => {
      // Check author information
      expect(screen.getByText('user1@test.com')).toBeInTheDocument();
      expect(screen.getByText('user2@test.com')).toBeInTheDocument();

      // Check timestamps
      expect(screen.getByText(/January 1, 2024/)).toBeInTheDocument();
      expect(screen.getByText(/January 2, 2024/)).toBeInTheDocument();
    });
  });
}); 