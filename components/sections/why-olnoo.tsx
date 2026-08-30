import { ShieldCheck, Layers, Zap, Building2 } from 'lucide-react'

const reasons = [
  {
    icon: Layers,
    title: 'Много страховых в одном месте',
    text: 'Сравнивайте продукты разных компаний и выбирайте лучшее покрытие под задачу.',
  },
  {
    icon: Zap,
    title: 'Оформление за минуты',
    text: 'Никаких бумаг и очередей — данные, оплата и полис проходят онлайн.',
  },
  {
    icon: ShieldCheck,
    title: 'Прозрачные условия',
    text: 'Понятные покрытия, сроки и риски. Никаких скрытых оговорок и звёздочек.',
  },
  {
    icon: Building2,
    title: 'Готово для организаций',
    text: 'Федерации и партнёры управляют требованиями и видят статусы застрахованных.',
  },
]

export function WhyOlnoo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-wide text-brand uppercase">
          Почему OLNOO Insurance
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
          Страхование, которому доверяют
        </h2>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <div key={r.title} className="bg-card p-6">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-foreground">
              <r.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {r.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
