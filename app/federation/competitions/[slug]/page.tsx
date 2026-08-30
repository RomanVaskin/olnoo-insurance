import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Pencil, Download, ShieldCheck } from 'lucide-react'
import { competitions, participants } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import type { Participant } from '@/lib/data'

export function generateStaticParams() {
  return competitions.map((c) => ({ slug: c.slug }))
}

const columns: Column<Participant>[] = [
  {
    key: 'name',
    header: 'Спортсмен',
    render: (p) => <span className="font-medium text-foreground">{p.name}</span>,
  },
  { key: 'club', header: 'Клуб', render: (p) => p.club },
  { key: 'policy', header: 'Полис', render: (p) => p.policy },
  { key: 'coverage', header: 'Покрытие', align: 'right', render: (p) => p.coverage },
  { key: 'validity', header: 'Срок', render: (p) => p.validity },
  {
    key: 'status',
    header: 'Статус',
    render: (p) => <StatusBadge status={p.status} />,
  },
]

export default async function FederationCompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const competition = competitions.find((c) => c.slug === slug)
  if (!competition) notFound()

  const pct = Math.round((competition.insured / competition.participants) * 100)

  return (
    <div className="space-y-8">
      <Link
        href="/federation/competitions"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Все соревнования
      </Link>

      <PageHeader
        eyebrow={competition.sport}
        title={competition.name}
        description={`${competition.dateLabel} · ${competition.location}`}
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" />
              Экспорт списка
            </Button>
            <Button
              render={
                <Link href={`/federation/competitions/${competition.slug}/edit`}>
                  <Pencil className="size-4" />
                  Редактировать
                </Link>
              }
            />
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Участников" value={competition.participants.toLocaleString('ru-RU')} />
        <StatCard label="Застраховано" value={`${pct}%`} hint={`${competition.insured} спортсменов`} />
        <StatCard label="Без страховки" value={String(competition.uninsured)} hint="Не допущены" />
        <StatCard label="На проверке" value={String(competition.toCheck)} hint="Ожидают верификации" />
      </div>

      <section className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-brand" />
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Страховые требования
          </h2>
        </div>
        <dl className="mt-4 grid gap-4 sm:grid-cols-4">
          {[
            { t: 'Мин. покрытие', v: competition.requirements.minCoverage },
            { t: 'Срок действия', v: competition.requirements.period },
            { t: 'Вид спорта', v: competition.requirements.sport },
            { t: 'Обязательный риск', v: competition.requirements.risk },
          ].map((item) => (
            <div key={item.t} className="rounded-xl border border-border bg-card p-4">
              <dt className="text-xs text-muted-foreground">{item.t}</dt>
              <dd className="mt-1 font-medium text-foreground">{item.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Участники и страховое покрытие
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Система автоматически сверяет полисы участников с требованиями
          соревнования.
        </p>
        <div className="mt-4">
          <DataTable columns={columns} rows={participants} caption="Участники" />
        </div>
      </section>
    </div>
  )
}
