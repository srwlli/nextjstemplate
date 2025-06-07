import { Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow divide-y">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900">General</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your general application settings</p>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900">Preferences</h3>
          <p className="text-sm text-gray-500 mt-1">Customize your app experience</p>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900">Account</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900">Privacy</h3>
          <p className="text-sm text-gray-500 mt-1">Control your privacy settings</p>
        </div>
      </div>
    </div>
  )
} 