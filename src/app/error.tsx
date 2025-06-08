'use client'; // Error Boundaries MUST be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

interface GlobalErrorPageProps {
  error: Error; // The error object that was thrown
  reset: () => void; // Function to attempt to recover from the error
}

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Caught:', error);
    // In a real application, you would send this to Sentry, Bugsnag, etc.
  }, [error]);

  return (
    <html> {/* Required for the root error.tsx */}
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-8 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold mb-4">Application Error</h1>
          <p className="text-lg mb-6">
            An unexpected error occurred. Please try again.
          </p>
          <p className="text-sm font-mono text-red-700 mb-6">{error.message || 'Unknown Error'}</p>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
          <Link href="/" className="mt-4 text-blue-600 hover:underline">Go to Homepage</Link>
        </div>
      </body>
    </html>
  );
} 