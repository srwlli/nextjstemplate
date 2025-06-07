import { FileText } from 'lucide-react'

export default function Page1() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Page 1</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Area</h2>
        <p className="text-gray-600 mb-4">This is Page 1 content area. Replace this with your specific functionality.</p>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  )
} 