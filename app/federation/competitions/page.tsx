import Link from 'next/link'
import { Plus, ArrowRight } from 'lucide-react'
import { competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import type { Competition } from '@/lib/data'

const columns: Column<Competition>[] = [
  {
    key: 'name',
    header: 'Соревнование',
    render: (c) => (
      <Link
        href={`/federation/competitions/${c.slug}`}
        className="font-medium text-foreground hover:text-brand"
      >
        {c.name}
      </Link>
    ),
  },
  { key: 'sport', header: 'Вид спорта', render: (c) => c.sport },
  { key: 'date', header: 'Даты', render: (c) => c.dateLabel },
  {
    key: 'participants',
    header: 'Участники',
    align: 'right',
    render: (c) => c.participants.toLocaleString('ru-RU'),
  },
  {
    key: 'coverage',
    header: 'Покрытие',
    render: (c) => {
      const pct = Math.round((c.insured / c.participants) * 100)
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-success"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{pct}%</span>
        </div>
      )
    },
  },
  {
    key: 'req',
    header: 'Страховка',
    render: (c) =>
      c.requirements.required ? (
        <StatusBadge status="Обязательна" tone="brand" />
      ) : (
        <StatusBadge status="Не требуется" tone="neutral" />
      ),
  },
  {
    key: 'action',
    header: '',
    align: 'right',
    render: (c) => (
      <Button
        variant="ghost"
        size="sm"
        render={
          <Link href={`/federation/competitions/${c.slug}`}>
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    ),
  },
]

export default function FederationCompetitionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Федерация"
        title="Соревнования"
        description="Управляйте календарём соревнований и страховыми требованиями к участникам."
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
      <FilterBar
        searchPlaceholder="Поиск соревнований…"
        filters={[
          { label: 'Вид спорта', options: ['Дзюдо', 'Бег', 'Хоккей'] },
          { label: 'Страховка', options: ['Обязательна', 'Не требуется'] },
        ]}
      />
      <DataTable columns={columns} rows={competitions} caption="Соревнования" />
    </div>
  )
}
