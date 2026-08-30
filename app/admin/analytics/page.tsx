import { TrendingUp, ShieldCheck, Wallet, Percent } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'

const monthly = [
  { label: 'Апр', value: 62 },
  { label: 'Май', value: 74 },
  { label: 'Июн', value: 68 },
  { label: 'Июл', value: 88 },
  { label: 'Авг', value: 96 },
  { label: 'Сен', value: 100 },
]

const byProduct = [
  { name: 'Спорт Актив', share: 46 },
  { name: 'Про Атлет', share: 28 },
  { name: 'Годовая защита', share: 16 },
  { name: 'Путешествие Комфорт', share: 10 },
]

export default function AdminAnalyticsPage() {
  const max = Math.max(...monthly.map((m) => m.value))

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Аналитика"
        title="Показатели продаж"
        description="Динамика продаж и структура портфеля продуктов на платформе OLNOO."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Премия за месяц" value="4.2 млн ₽" icon={Wallet} trend={{ value: '+18%', positive: true }} />
        <StatCard label="Полисов продано" value="3 218" icon={ShieldCheck} trend={{ value: '+9%', positive: true }} />
        <StatCard label="Конверсия" value="7.4%" icon={Percent} trend={{ value: '+1.2 п.п.', positive: true }} />
        <StatCard label="Средний чек" value="1 305 ₽" icon={TrendingUp} trend={{ value: '+3%', positive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
          <h2 className="text-sm font-semibold text-foreground">Продажи по месяцам</h2>
          <div className="mt-6 flex h-56 items-end gap-3">
            {monthly.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-brand transition-all"
                    style={{ height: `${(m.value / max) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground">Структура портфеля</h2>
          <ul className="mt-6 space-y-4">
            {byProduct.map((p) => (
              <li key={p.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{p.name}</span>
                  <span className="text-muted-foreground">{p.share}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${p.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
