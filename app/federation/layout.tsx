'use client'

import { LayoutDashboard, Trophy, Users, ShieldCheck, Settings } from 'lucide-react'
import { AppShell, type NavSection } from '@/components/app-shell'

const sections: NavSection[] = [
  {
    items: [
      { href: '/federation', label: 'Обзор', icon: LayoutDashboard },
      { href: '/federation/competitions', label: 'Соревнования', icon: Trophy },
      { href: '/federation/athletes', label: 'Спортсмены', icon: Users },
      { href: '/federation/requirements', label: 'Требования', icon: ShieldCheck },
      { href: '/federation/settings', label: 'Настройки', icon: Settings },
    ],
  },
]

export default function FederationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell
      sections={sections}
      workspace={{
        name: 'Федерация дзюдо России',
        role: 'Организатор',
        initials: 'ФД',
      }}
    >
      {children}
    </AppShell>
  )
}
