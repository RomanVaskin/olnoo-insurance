import { Download, FileText } from 'lucide-react'
import { policies, insurerById } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import type { Policy } from '@/lib/data'

const columns: Column<Policy>[] = [
  {
    key: 'doc',
    header: 'Документ',
    render: (p) => (
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-secondary text-muted-foreground">
          <FileText className="size-4" />
        </span>
        <div>
          <p className="font-medium text-foreground">{p.type}</p>
          <p className="font-mono text-xs text-muted-foreground">№ {p.number}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'insurer',
    header: 'Страховая',
    render: (p) => insurerById(p.insurerId)?.name ?? '—',
  },
  { key: 'dates', header: 'Срок', render: (p) => p.dates },
  {
    key: 'status',
    header: 'Статус',
    render: (p) => <StatusBadge status={p.status} />,
  },
  {
    key: 'action',
    header: '',
    align: 'right',
    render: () => (
      <Button variant="ghost" size="sm">
        <Download className="size-4" />
        PDF
      </Button>
    ),
  },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Аккаунт"
        title="Документы"
        description="Полисы, справки и другие документы, доступные для скачивания."
      />
      <DataTable columns={columns} rows={policies} caption="Список документов" />
    </div>
  )
}
