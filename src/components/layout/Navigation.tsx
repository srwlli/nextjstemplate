'use client'
import { Home, FileText, Grid, Layers, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Page 1', href: '/page1', icon: FileText },
  { name: 'Page 2', href: '/page2', icon: Grid },
  { name: 'Page 3', href: '/page3', icon: Layers },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center p-2 text-xs',
                isActive ? 'text-primary-600' : 'text-gray-500'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 