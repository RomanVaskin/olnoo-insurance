import { applications, insurerById } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import type { Application } from '@/lib/data'

const columns: Column<Application>[] = [
  {
    key: 'id',
    header: 'Заявка',
    render: (a) => (
      <span className="font-mono text-xs text-muted-foreground">{a.id}</span>
    ),
  },
  {
    key: 'client',
    header: 'Клиент',
    render: (a) => <span className="font-medium text-foreground">{a.client}</span>,
  },
  { key: 'product', header: 'Продукт', render: (a) => a.product },
  {
    key: 'insurer',
    header: 'Страховая',
    render: (a) => insurerById(a.insurerId)?.name ?? '—',
  },
  { key: 'manager', header: 'Менеджер', render: (a) => a.manager },
  { key: 'date', header: 'Дата', render: (a) => a.date },
  {
    key: 'amount',
    header: 'Сумма',
    align: 'right',
    render: (a) => <span className="font-medium text-foreground">{a.amount}</span>,
  },
  {
    key: 'status',
    header: 'Статус',
    render: (a) => <StatusBadge status={a.status} />,
  },
]

export default function AgencyApplicationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Агентство"
        title="Заявки"
        description="Все заявки на оформление полисов от менеджеров агентства."
      />
      <FilterBar
        searchPlaceholder="Поиск по клиенту или номеру…"
        filters={[
          {
            label: 'Статус',
            options: ['Подтверждена', 'Ожидает оплаты', 'Требует проверки'],
          },
          { label: 'Менеджер', options: ['Ольга К.', 'Дмитрий П.', 'Сергей В.'] },
        ]}
      />
      <DataTable columns={columns} rows={applications} caption="Заявки" />
    </div>
  )
}
