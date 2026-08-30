import { participants } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import type { Participant } from '@/lib/data'

const columns: Column<Participant>[] = [
  {
    key: 'name',
    header: 'Спортсмен',
    render: (p) => <span className="font-medium text-foreground">{p.name}</span>,
  },
  { key: 'birth', header: 'Дата рождения', render: (p) => p.birth },
  { key: 'club', header: 'Клуб', render: (p) => p.club },
  { key: 'policy', header: 'Полис', render: (p) => p.policy },
  {
    key: 'status',
    header: 'Страховка',
    render: (p) => <StatusBadge status={p.status} />,
  },
]

export default function FederationAthletesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Федерация"
        title="Спортсмены"
        description="Реестр спортсменов федерации и статус их страхового покрытия."
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
      <DataTable columns={columns} rows={participants} caption="Спортсмены" />
    </div>
  )
}
