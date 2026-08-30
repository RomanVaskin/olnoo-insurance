import { TrendingUp, Users, ShieldCheck, Percent } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'

const monthly = [
  { m: 'Апр', v: 62 },
  { m: 'Май', v: 74 },
  { m: 'Июн', v: 68 },
  { m: 'Июл', v: 91 },
  { m: 'Авг', v: 108 },
  { m: 'Сен', v: 84 },
]

const max = Math.max(...monthly.map((d) => d.v))

export default function AgencyReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Агентство"
        title="Отчёты"
        description="Аналитика продаж полисов и активности клиентов агентства."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Полисов за квартал" value="283" icon={ShieldCheck} trend={{ value: '+14%', positive: true }} />
        <StatCard label="Новые клиенты" value="46" icon={Users} trend={{ value: '+9', positive: true }} />
        <StatCard label="Средний чек" value="4 380 ₽" icon={TrendingUp} />
        <StatCard label="Пролонгация" value="72%" icon={Percent} trend={{ value: '+5%', positive: true }} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-foreground">
          Оформленные полисы по месяцам
        </h2>
        <div className="mt-6 flex h-56 items-end gap-3">
          {monthly.map((d) => (
            <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-brand/80 transition-all hover:bg-brand"
                  style={{ height: `${(d.v / max) * 100}%` }}
                  title={`${d.v} полисов`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.m}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
