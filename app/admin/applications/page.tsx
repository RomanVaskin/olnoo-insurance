import { applications, insurerById, type Application } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'

export default function AdminApplicationsPage() {
  const rows = applications.filter((a) => a.insurerId === 'alfa')

  const columns: Column<Application>[] = [
    {
      key: 'id',
      header: 'Заявка',
      render: (r) => <span className="font-medium text-foreground">{r.id}</span>,
    },
    { key: 'client', header: 'Клиент', render: (r) => r.client },
    { key: 'product', header: 'Продукт', render: (r) => r.product },
    { key: 'amount', header: 'Премия', align: 'right', render: (r) => r.amount },
    { key: 'date', header: 'Дата', render: (r) => r.date },
    {
      key: 'status',
      header: 'Статус',
      render: (r) => <StatusBadge status={r.status} />,
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Продажи"
        title="Заявки по продуктам"
        description={`Поток заявок на продукты компании ${insurerById('alfa')?.name}. Всего в работе: ${rows.length}.`}
      />
      <DataTable columns={columns} rows={rows} caption="Заявки" />
    </div>
  )
}
