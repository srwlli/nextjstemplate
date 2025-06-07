import { Layers } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-primary-600 text-white p-4">
      <div className="flex items-center space-x-2">
        <Layers className="w-6 h-6" />
        <h1 className="text-xl font-bold">App Template</h1>
      </div>
    </header>
  )
} 