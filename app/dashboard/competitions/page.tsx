import Link from 'next/link'
import { CalendarDays, MapPin, ArrowRight, ShieldCheck } from 'lucide-react'
import { competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'

export default function CustomerCompetitionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Соревнования"
        title="Мои соревнования"
        description="Проверьте страховые требования и оформите полис под каждое соревнование."
      />

      <div className="space-y-4">
        {competitions.map((c, i) => {
          const covered = i === 0
          return (
            <div
              key={c.slug}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">{c.name}</h3>
                    <StatusBadge status={c.sport} tone="neutral" />
                    {c.requirements.required ? (
                      <StatusBadge status="Страховка обязательна" tone="brand" />
                    ) : null}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
                <StatusBadge
                  status={covered ? 'Требования выполнены' : 'Нужна страховка'}
                  tone={covered ? 'success' : 'warning'}
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4 text-brand" />
                  Минимальное покрытие: {c.requirements.minCoverage} ·{' '}
                  {c.requirements.risk}
                </p>
                <Button
                  variant={covered ? 'outline' : 'default'}
                  render={
                    <Link href={`/dashboard/competitions/${c.slug}`}>
                      {covered ? 'Посмотреть полис' : 'Выбрать страховку'}
                      <ArrowRight className="size-4" />
                    </Link>
                  }
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
