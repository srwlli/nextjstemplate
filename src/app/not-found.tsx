import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center bg-gray-50 p-8 rounded-lg shadow-md mx-auto max-w-lg">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
        Go to Homepage
      </Link>
    </div>
  );
} 