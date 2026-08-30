'use client'

import {
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  FileText,
  User,
  LifeBuoy,
} from 'lucide-react'
import { AppShell, type NavSection } from '@/components/app-shell'

const sections: NavSection[] = [
  {
    items: [
      { href: '/dashboard', label: 'Обзор', icon: LayoutDashboard },
      { href: '/dashboard/policies', label: 'Мои полисы', icon: ShieldCheck },
      { href: '/dashboard/competitions', label: 'Соревнования', icon: Trophy },
    ],
  },
  {
    title: 'Аккаунт',
    items: [
      { href: '/dashboard/documents', label: 'Документы', icon: FileText },
      { href: '/dashboard/profile', label: 'Профиль', icon: User },
      { href: '/dashboard/support', label: 'Поддержка', icon: LifeBuoy },
    ],
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell
      sections={sections}
      workspace={{
        name: 'Алексей Иванов',
        role: 'Спортсмен · Дзюдо',
        initials: 'АИ',
      }}
    >
      {children}
    </AppShell>
  )
}
