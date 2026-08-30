import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const points = [
  'Создайте публичную страницу соревнования',
  'Задайте требования к страховке участников',
  'Отслеживайте, кто из спортсменов уже застрахован',
]

export function PartnersCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-12">
          <div>
            <p className="text-xs font-medium tracking-wide text-primary-foreground/60 uppercase">
              Для федераций и партнёров
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Соберите застрахованных участников без хаоса
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-primary-foreground/70 text-pretty">
              Федерации, клубы и организаторы турниров публикуют страницу события
              и получают прозрачную картину по страхованию каждого спортсмена.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="h-11 px-6 text-[15px]"
                render={
                  <Link href="/federation">
                    Кабинет федерации
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
              <Button
                variant="ghost"
                size="lg"
                className="h-11 px-6 text-[15px] text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={<Link href="/partners">Стать партнёром</Link>}
              />
            </div>
          </div>

          <ul className="space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-xl bg-primary-foreground/5 px-4 py-3.5 text-sm"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground/10">
                  <Check className="size-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
