import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldCheck,
  BarChart3,
} from 'lucide-react'
import { AppShell, type NavSection } from '@/components/app-shell'

const sections: NavSection[] = [
  {
    items: [
      { href: '/agency', label: 'Обзор', icon: LayoutDashboard },
      { href: '/agency/clients', label: 'Клиенты', icon: Users },
      { href: '/agency/applications', label: 'Заявки', icon: FileText },
      { href: '/agency/policies', label: 'Полисы', icon: ShieldCheck },
      { href: '/agency/reports', label: 'Отчёты', icon: BarChart3 },
    ],
  },
]

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell
      sections={sections}
      workspace={{
        name: 'Спортивное агентство «Виктория»',
        role: 'Менеджер · Ольга К.',
        initials: 'СВ',
      }}
    >
      {children}
    </AppShell>
  )
}
