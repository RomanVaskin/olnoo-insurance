import {
  LayoutDashboard,
  Package,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react'
import { AppShell, type NavSection } from '@/components/app-shell'

const sections: NavSection[] = [
  {
    items: [
      { href: '/admin', label: 'Обзор', icon: LayoutDashboard },
      { href: '/admin/products', label: 'Продукты', icon: Package },
      { href: '/admin/applications', label: 'Заявки', icon: FileText },
      { href: '/admin/analytics', label: 'Аналитика', icon: BarChart3 },
      { href: '/admin/settings', label: 'Настройки', icon: Settings },
    ],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell
      sections={sections}
      workspace={{
        name: 'АльфаСтрахование',
        role: 'Кабинет продукта',
        initials: 'АС',
      }}
    >
      {children}
    </AppShell>
  )
}
