import { participants, insurerById } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import type { Participant } from '@/lib/data'

const insured = participants.filter((p) => p.status !== 'Нет страховки')

const columns: Column<Participant>[] = [
  {
    key: 'name',
    header: 'Клиент',
    render: (p) => <span className="font-medium text-foreground">{p.name}</span>,
  },
  { key: 'policy', header: 'Продукт', render: (p) => p.policy },
  { key: 'coverage', header: 'Покрытие', align: 'right', render: (p) => p.coverage },
  { key: 'validity', header: 'Срок действия', render: (p) => p.validity },
  {
    key: 'status',
    header: 'Статус',
    render: (p) => <StatusBadge status={p.status} />,
  },
]

export default function AgencyPoliciesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Агентство"
        title="Полисы клиентов"
        description="Все действующие полисы, оформленные агентством, с контролем сроков."
      />
      <FilterBar
        searchPlaceholder="Поиск по клиенту…"
        filters={[
          { label: 'Статус', options: ['Подтверждена', 'Истекает слишком рано'] },
          { label: 'Продукт', options: ['Спорт Актив', 'Про Атлет'] },
        ]}
      />
      <DataTable columns={columns} rows={insured} caption="Полисы клиентов" />
    </div>
  )
}
