import Link from 'next/link'
import { Users, FileText, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react'
import { applications, insurerById } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
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

export default function AgencyDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Агентство"
        title="Обзор агентства"
        description="Управляйте клиентами, оформляйте полисы и следите за заявками команды."
        actions={
          <Button
            render={
              <Link href="/agency/clients">
                Оформить полис
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Активные клиенты"
          value="248"
          icon={Users}
          trend={{ value: '+12', positive: true }}
          hint="За последний месяц"
        />
        <StatCard
          label="Заявки в работе"
          value="18"
          icon={FileText}
          hint="Ожидают обработки"
        />
        <StatCard
          label="Действующие полисы"
          value="612"
          icon={ShieldCheck}
          hint="По всем клиентам"
        />
        <StatCard
          label="Оборот за месяц"
          value="1.24 млн ₽"
          icon={TrendingUp}
          trend={{ value: '+8%', positive: true }}
        />
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Последние заявки
          </h2>
          <Button
            variant="ghost"
            render={
              <Link href="/agency/applications">
                Все заявки
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
        <div className="mt-4">
          <DataTable columns={columns} rows={applications} caption="Заявки" />
        </div>
      </section>
    </div>
  )
}
