import { Layers } from 'lucide-react'

export default function Page3() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Layers className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Page 3</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Area</h2>
        <p className="text-gray-600 mb-4">This is Page 3 content area. Replace this with your specific functionality.</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 