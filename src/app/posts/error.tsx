// src/app/posts/error.tsx
// This UI will be displayed if an error occurs while fetching data in src/app/posts/page.tsx or its children.
'use client'; // Error Boundaries must be Client Components

import { useEffect, useState } from 'react';

interface ErrorPageProps {
  error: Error; // The error object that was thrown
  reset: () => void; // Function to attempt to recover from the error
}

type ErrorCategory = 'network' | 'auth' | 'data' | 'unknown';

function categorizeError(error: Error): ErrorCategory {
  const message = error.message.toLowerCase();
  if (message.includes('network') || message.includes('fetch')) return 'network';
  if (message.includes('auth') || message.includes('unauthorized')) return 'auth';
  if (message.includes('data') || message.includes('invalid')) return 'data';
  return 'unknown';
}

function getErrorMessage(category: ErrorCategory, error: Error): string {
  switch (category) {
    case 'network':
      return 'Unable to connect to the server. Please check your internet connection.';
    case 'auth':
      return 'Authentication error. Please try logging in again.';
    case 'data':
      return 'There was a problem loading the data. Please try again.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
}

export default function PostsError({ error, reset }: ErrorPageProps) {
  const [retryCount, setRetryCount] = useState(0);
  const category = categorizeError(error);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error in /posts route segment:', {
      message: error.message,
      stack: error.stack,
      category,
      retryCount
    });
  }, [error, category, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-red-50 text-red-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      
      <div className="bg-white p-4 rounded-md mb-6 w-full max-w-lg">
        <p className="text-lg mb-2">{getErrorMessage(category, error)}</p>
        <p className="text-sm font-mono text-red-700 bg-red-50 p-2 rounded">
          {error.message || 'Unknown Error'}
        </p>
      </div>

      <div className="space-y-4">
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
          onClick={handleRetry}
          disabled={retryCount >= 3}
        >
          {retryCount >= 3 ? 'Maximum retries reached' : 'Try again'}
        </button>

        {retryCount > 0 && (
          <p className="text-sm text-red-600">
            Retry attempt {retryCount} of 3
          </p>
        )}

        <p className="text-sm text-red-600">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
} 