import Link from 'next/link'
import { Package, FileText, TrendingUp, Percent, ArrowRight, Plus } from 'lucide-react'
import { products } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'

export default function AdminDashboardPage() {
  const own = products.filter((p) => p.insurerId === 'alfa')
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="АльфаСтрахование"
        title="Обзор кабинета"
        description="Управляйте линейкой страховых продуктов и следите за продажами на платформе OLNOO."
        actions={
          <Button
            render={
              <Link href="/admin/products">
                <Plus className="size-4" />
                Новый продукт
              </Link>
            }
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Активные продукты" value={String(own.length)} icon={Package} />
        <StatCard label="Заявки за месяц" value="1 284" icon={FileText} trend={{ value: '+11%', positive: true }} />
        <StatCard label="Продажи за месяц" value="3.6 млн ₽" icon={TrendingUp} trend={{ value: '+7%', positive: true }} />
        <StatCard label="Конверсия" value="24%" icon={Percent} trend={{ value: '+3%', positive: true }} />
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Мои продукты
          </h2>
          <Button
            variant="ghost"
            render={
              <Link href="/admin/products">
                Управление
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {own.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.period}</p>
              <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Покрытие</p>
                  <p className="font-medium text-foreground">{p.coverage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Цена</p>
                  <p className="font-semibold text-foreground">{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
