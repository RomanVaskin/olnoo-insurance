import Link from 'next/link'
import {
  ShieldCheck,
  Trophy,
  Clock,
  ArrowRight,
  AlertTriangle,
  CalendarDays,
  MapPin,
} from 'lucide-react'
import { policies, competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { PolicyCard } from '@/components/policy-card'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'

export default function CustomerDashboardPage() {
  const activePolicies = policies.filter((p) => p.status === 'Активна')
  const expiring = policies.filter((p) => p.status === 'Истекает')
  const upcoming = competitions.slice(0, 2)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Личный кабинет"
        title="Добро пожаловать, Алексей"
        description="Управляйте своими полисами и проверяйте страховые требования соревнований."
        actions={
          <Button
            render={
              <Link href="/insurance">
                Оформить полис
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Активные полисы"
          value={String(activePolicies.length)}
          icon={ShieldCheck}
          hint="Действуют сейчас"
        />
        <StatCard
          label="Истекают скоро"
          value={String(expiring.length)}
          icon={Clock}
          hint="Требуют продления"
        />
        <StatCard
          label="Соревнования"
          value="3"
          icon={Trophy}
          hint="Предстоящие с вашим участием"
        />
        <StatCard
          label="Общее покрытие"
          value="2.5 млн ₽"
          icon={ShieldCheck}
          hint="По всем полисам"
        />
      </div>

      {expiring.length > 0 ? (
        <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {expiring.length} полис скоро истекает
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              «{expiring[0].type}» действует до{' '}
              {expiring[0].dates.split('–')[1]?.trim()}. Продлите заранее, чтобы
              сохранить покрытие.
            </p>
          </div>
          <Button variant="outline" size="lg">
            Продлить
          </Button>
        </div>
      ) : null}

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Мои полисы
          </h2>
          <Button
            variant="ghost"
            render={
              <Link href="/dashboard/policies">
                Все полисы
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {policies.map((p) => (
            <PolicyCard key={p.id} policy={p} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Предстоящие соревнования
          </h2>
          <Button
            variant="ghost"
            render={
              <Link href="/dashboard/competitions">
                Все
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
        <div className="mt-4 space-y-3">
          {upcoming.map((c) => {
            const covered = c.insured >= c.participants * 0.9
            return (
              <Link
                key={c.slug}
                href={`/dashboard/competitions/${c.slug}`}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-medium text-foreground">
                      {c.name}
                    </h3>
                    <StatusBadge status={c.sport} tone="neutral" />
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4" />
                      {c.dateLabel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {c.location}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge
                    status={covered ? 'Требования выполнены' : 'Нужна страховка'}
                    tone={covered ? 'success' : 'warning'}
                  />
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
