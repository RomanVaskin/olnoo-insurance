import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Landmark, ShieldCheck, Users } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Партнёрам — OLNOO',
  description:
    'Возможности для страховых компаний, спортивных агентств и федераций на платформе OLNOO.',
}

const partners = [
  {
    icon: ShieldCheck,
    title: 'Страховым компаниям',
    description:
      'Размещайте продукты в каталоге, управляйте условиями и получайте заявки от спортсменов и организаторов.',
    points: ['Управление продуктами', 'Модерация условий', 'Аналитика продаж'],
    href: '/admin',
    cta: 'Кабинет продукта',
  },
  {
    icon: Building2,
    title: 'Спортивным агентствам',
    description:
      'Оформляйте полисы для клиентов, ведите их профили и контролируйте сроки действия страховок.',
    points: ['Профили клиентов', 'Массовое оформление', 'Контроль сроков'],
    href: '/agency',
    cta: 'Кабинет агентства',
  },
  {
    icon: Landmark,
    title: 'Федерациям и организаторам',
    description:
      'Создавайте соревнования, задавайте страховые требования и следите за покрытием всех участников.',
    points: ['Управление турнирами', 'Требования к полисам', 'Статус участников'],
    href: '/federation',
    cta: 'Кабинет федерации',
  },
]

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Партнёрам"
        title="Работайте с OLNOO"
        description="Единая платформа объединяет страховые компании, агентства и спортивные федерации вокруг понятного процесса страхования."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {partners.map((p) => (
          <div
            key={p.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
              <p.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              {p.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              {p.description}
            </p>
            <ul className="mt-4 space-y-2">
              {p.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="size-1.5 rounded-full bg-brand" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-5">
              <Button
                variant="outline"
                className="w-full"
                render={
                  <Link href={p.href}>
                    {p.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
        ))}
      </div>

      <section className="mt-14 overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-12 text-background sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium">
            <Users className="size-3.5" />
            Более 120 000 застрахованных спортсменов
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance">
            Присоединяйтесь к экосистеме OLNOO
          </h2>
          <p className="mt-3 text-background/70 text-pretty">
            Оставьте заявку, и мы поможем подключить ваши продукты или организовать
            страхование участников соревнований.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 bg-background px-6 text-[15px] text-foreground hover:bg-background/90"
              render={<Link href="/admin">Стать партнёром</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-background/30 bg-transparent px-6 text-[15px] text-background hover:bg-background/10"
              render={<Link href="/insurance">Смотреть каталог</Link>}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
