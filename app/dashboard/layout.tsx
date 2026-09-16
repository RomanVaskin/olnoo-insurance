'use client'

import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  FileText,
  User,
  LifeBuoy,
} from 'lucide-react'
import { AppShell, type NavSection } from '@/components/app-shell'
import { AuthGuard } from '@/components/auth-guard'
import { athleteApi, type AthleteProfile } from '@/lib/athlete-api'

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

function initialsOf(lastName: string, firstName: string): string {
  return `${lastName.charAt(0)}${firstName.charAt(0)}`.toUpperCase()
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [profile, setProfile] = useState<AthleteProfile | null>(null)

  useEffect(() => {
    let active = true
    athleteApi.profile().then(({ ok, data }) => {
      if (active && ok && data) {
        setProfile(data)
      }
    })
    return () => {
      active = false
    }
  }, [])

  const { person, federation_memberships: memberships } = profile ?? {}
  const sportName = memberships?.[0]?.sport_name

  return (
    <AuthGuard>
      <AppShell
        sections={sections}
        workspace={{
          name: person
            ? [person.last_name, person.first_name, person.patronymic].filter(Boolean).join(' ')
            : '',
          role: sportName ? `Спортсмен · ${sportName}` : 'Спортсмен',
          initials: person ? initialsOf(person.last_name, person.first_name) : '',
        }}
      >
        {children}
      </AppShell>
    </AuthGuard>
  )
}
