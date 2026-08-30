import { ShieldCheck } from 'lucide-react'
import { competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'

export default function FederationRequirementsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Федерация"
        title="Страховые требования"
        description="Единые шаблоны страховых требований, которые применяются к соревнованиям."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {competitions.map((c) => (
          <div
            key={c.slug}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-brand" />
                <h2 className="font-semibold text-foreground">{c.sport}</h2>
              </div>
              <StatusBadge
                status={c.requirements.required ? 'Обязательна' : 'Не требуется'}
                tone={c.requirements.required ? 'brand' : 'neutral'}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{c.name}</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              {[
                { t: 'Минимальное покрытие', v: c.requirements.minCoverage },
                { t: 'Обязательный риск', v: c.requirements.risk },
                { t: 'Срок действия', v: c.requirements.period },
              ].map((row) => (
                <div key={row.t} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{row.t}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
