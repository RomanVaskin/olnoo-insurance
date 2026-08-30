import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Trophy, Users } from 'lucide-react'
import { sports, competitions, products } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { SportCard } from '@/components/sport-card'
import { EventCard } from '@/components/event-card'
import { InsuranceProductCard } from '@/components/insurance-product-card'

export const metadata: Metadata = {
  title: 'Страхование спорта — OLNOO',
  description:
    'Страхование спортсменов и соревнований: покрытие несчастных случаев, травм и реабилитации. Основное направление платформы OLNOO.',
}

export default function SportPage() {
  const sportProducts = products.filter((p) => p.category === 'sport')
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sport-judo.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium text-background backdrop-blur">
              <ShieldCheck className="size-3.5" />
              Основное направление платформы
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-background text-balance sm:text-5xl">
              Страхование спорта для атлетов и организаторов
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-background/80 text-pretty">
              Оформляйте полисы для тренировок и соревнований, а организаторы
              контролируют страховое покрытие всех участников в одном месте.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-11 px-6 text-[15px]"
                render={
                  <Link href="/insurance">
                    Выбрать страховку
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-background/30 bg-background/10 px-6 text-[15px] text-background hover:bg-background/20"
                render={<Link href="#competitions">Соревнования</Link>}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Users, v: '120 000+', l: 'застрахованных спортсменов' },
            { icon: Trophy, v: '340', l: 'соревнований в год' },
            { icon: ShieldCheck, v: '24', l: 'спортивных продукта' },
            { icon: ShieldCheck, v: '5', l: 'страховых компаний' },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                <s.icon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-semibold tracking-tight text-foreground">
                  {s.v}
                </p>
                <p className="text-xs text-muted-foreground text-pretty">{s.l}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Виды спорта
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Подберите страховку под конкретную дисциплину.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {sports.map((s) => (
            <SportCard key={s.slug} sport={s} />
          ))}
        </div>
      </section>

      <section
        id="competitions"
        className="border-y border-border bg-secondary/40"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Ближайшие соревнования
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Соревнования, где требуется подтверждённая страховка.
              </p>
            </div>
            <Button
              variant="ghost"
              render={
                <Link href="/competitions">
                  Все соревнования
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {competitions.map((c) => (
              <EventCard key={c.slug} competition={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Спортивные страховки
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Продукты от партнёров с покрытием травм и реабилитации.
            </p>
          </div>
          <Button
            variant="ghost"
            render={
              <Link href="/insurance">
                Весь каталог
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sportProducts.map((p) => (
            <InsuranceProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
