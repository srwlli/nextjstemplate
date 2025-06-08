// src/app/posts/loading.tsx
// This UI will be displayed while the data in src/app/posts/page.tsx is being fetched.

export default function PostsLoading() {
  return (
    <div className="space-y-8 p-4">
      {/* Loading Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Loading Spinner */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600">Loading posts...</p>
      </div>

      {/* Skeleton Posts */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-4">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 