import Link from 'next/link'
import {
  Trophy,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'

export default function FederationDashboardPage() {
  const totalParticipants = competitions.reduce(
    (sum, c) => sum + c.participants,
    0,
  )
  const totalUninsured = competitions.reduce((sum, c) => sum + c.uninsured, 0)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Федерация"
        title="Обзор соревнований"
        description="Контролируйте страховое покрытие участников и управляйте требованиями к полисам."
        actions={
          <Button
            render={
              <Link href="/federation/competitions/new">
                <Plus className="size-4" />
                Новое соревнование
              </Link>
            }
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Активные соревнования" value={String(competitions.length)} icon={Trophy} />
        <StatCard label="Всего участников" value={totalParticipants.toLocaleString('ru-RU')} icon={Users} />
        <StatCard label="Застраховано" value="94%" icon={ShieldCheck} trend={{ value: '+2%', positive: true }} />
        <StatCard label="Без страховки" value={String(totalUninsured)} icon={AlertTriangle} hint="Требуют внимания" />
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Мои соревнования
          </h2>
          <Button
            variant="ghost"
            render={
              <Link href="/federation/competitions">
                Все
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
        <div className="mt-4 space-y-4">
          {competitions.map((c) => {
            const pct = Math.round((c.insured / c.participants) * 100)
            return (
              <Link
                key={c.slug}
                href={`/federation/competitions/${c.slug}`}
                className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">{c.name}</h3>
                      <StatusBadge status={c.sport} tone="neutral" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.dateLabel} · {c.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Покрытие</p>
                      <p className="text-lg font-semibold text-foreground">
                        {pct}%
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    Застраховано:{' '}
                    <span className="font-medium text-success">{c.insured}</span>
                  </span>
                  <span>
                    Без страховки:{' '}
                    <span className="font-medium text-destructive">
                      {c.uninsured}
                    </span>
                  </span>
                  <span>
                    На проверке:{' '}
                    <span className="font-medium text-warning-foreground">
                      {c.toCheck}
                    </span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
