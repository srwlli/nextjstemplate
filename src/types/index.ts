import { LucideIcon } from 'lucide-react'

// Generic user types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  username?: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Generic data types
export interface GenericItem {
  id: string
  user_id: string
  title: string
  description?: string
  data?: Record<string, unknown>
  created_at: string
  updated_at: string
}

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

// Generic card data
export interface CardData {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
} 