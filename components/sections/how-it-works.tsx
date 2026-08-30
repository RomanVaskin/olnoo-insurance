import { Search, GitCompare, CreditCard, FileCheck } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Выберите направление',
    text: 'Откройте нужную категорию или страницу соревнования и укажите данные.',
  },
  {
    icon: GitCompare,
    title: 'Сравните предложения',
    text: 'Мы покажем только подходящие продукты от нескольких страховых компаний.',
  },
  {
    icon: CreditCard,
    title: 'Оплатите онлайн',
    text: 'Оплата проходит через платформу — быстро и безопасно, без бумаг.',
  },
  {
    icon: FileCheck,
    title: 'Получите полис',
    text: 'Полис в PDF приходит сразу, а статус страховки становится подтверждённым.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-brand uppercase">
            Как это работает
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
            Полис за четыре шага
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-border bg-background text-foreground">
                  <s.icon className="size-5" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
