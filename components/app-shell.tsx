'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bell, Menu, Search, X, type LucideIcon } from 'lucide-react'
import { Logo } from '@/components/brand'
import { cn } from '@/lib/utils'

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export type NavSection = {
  title?: string
  items: NavItem[]
}

type Workspace = {
  name: string
  role: string
  initials: string
}

export function AppShell({
  sections,
  workspace,
  children,
}: {
  sections: NavSection[]
  workspace: Workspace
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Logo />
      </div>

      <div className="border-b border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            {workspace.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {workspace.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {workspace.role}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-3">
        {sections.map((section, i) => (
          <div key={section.title ?? i} className="space-y-1">
            {section.title ? (
              <p className="px-3 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {section.title}
              </p>
            ) : null}
            {section.items.map((item) => {
              const active =
                item.href === pathname ||
                (item.href !== '/' && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          Вернуться на сайт
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-sidebar-border bg-sidebar">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 grid size-8 place-items-center rounded-md text-muted-foreground"
              aria-label="Закрыть меню"
            >
              <X className="size-5" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-9 place-items-center rounded-md border border-border text-foreground lg:hidden"
            aria-label="Открыть меню"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Поиск по платформе…"
              className="h-9 w-full rounded-lg border border-border bg-secondary/60 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:bg-background focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative grid size-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
              aria-label="Уведомления"
            >
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-brand" />
            </button>
            <span className="grid size-9 place-items-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              {workspace.initials}
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
