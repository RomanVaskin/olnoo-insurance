import Link from 'next/link'
import { UserPlus, ArrowRight } from 'lucide-react'
import { participants } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import type { Participant } from '@/lib/data'

const columns: Column<Participant>[] = [
  {
    key: 'name',
    header: 'Клиент',
    render: (p) => (
      <Link
        href={`/agency/clients/${p.id}`}
        className="font-medium text-foreground hover:text-brand"
      >
        {p.name}
      </Link>
    ),
  },
  { key: 'birth', header: 'Дата рождения', render: (p) => p.birth },
  { key: 'club', header: 'Клуб', render: (p) => p.club },
  { key: 'policy', header: 'Полис', render: (p) => p.policy },
  {
    key: 'coverage',
    header: 'Покрытие',
    align: 'right',
    render: (p) => p.coverage,
  },
  {
    key: 'status',
    header: 'Статус',
    render: (p) => <StatusBadge status={p.status} />,
  },
  {
    key: 'action',
    header: '',
    align: 'right',
    render: (p) => (
      <Button
        variant="ghost"
        size="sm"
        render={
          <Link href={`/agency/clients/${p.id}`}>
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    ),
  },
]

export default function AgencyClientsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Агентство"
        title="Клиенты"
        description="База спортсменов агентства с их полисами и статусами страхования."
        actions={
          <Button>
            <UserPlus className="size-4" />
            Добавить клиента
          </Button>
        }
      />

      <FilterBar
        searchPlaceholder="Поиск по имени или клубу…"
        filters={[
          {
            label: 'Статус',
            options: ['Подтверждена', 'Нет страховки', 'Требует проверки'],
          },
          { label: 'Клуб', options: ['ЦСКА', 'Динамо', 'СК «Самбо-70»'] },
        ]}
      />

      <DataTable columns={columns} rows={participants} caption="Клиенты" />
    </div>
  )
}
