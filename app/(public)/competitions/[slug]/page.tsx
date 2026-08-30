import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react'
import { competitions, products } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { InsuranceProductCard } from '@/components/insurance-product-card'

export function generateStaticParams() {
  return competitions.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const competition = competitions.find((c) => c.slug === slug)
  if (!competition) return { title: 'Соревнование — OLNOO' }
  return {
    title: `${competition.name} — OLNOO`,
    description: competition.description,
  }
}

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const competition = competitions.find((c) => c.slug === slug)
  if (!competition) notFound()

  const req = competition.requirements
  const coveragePct = Math.round(
    (competition.insured / competition.participants) * 100,
  )
  const relevantProducts = products
    .filter((p) => p.category === 'sport')
    .slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={competition.image || '/placeholder.svg'}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/competitions"
            className="text-sm text-background/70 transition-colors hover:text-background"
          >
            ← Все соревнования
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">
              {competition.sport}
            </span>
            {req.required ? (
              <StatusBadge status="Страховка обязательна" tone="brand" />
            ) : null}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-background text-balance sm:text-4xl">
            {competition.name}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-background/80">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              {competition.dateLabel}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {competition.location}
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="size-4" />
              {competition.organizer}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              О соревновании
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
              {competition.description}
            </p>
          </section>

          <section className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-brand" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Страховые требования
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Для допуска к участию требуется действующий полис, соответствующий
              условиям организатора.
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { t: 'Минимальное покрытие', v: req.minCoverage },
                { t: 'Срок действия полиса', v: req.period },
                { t: 'Вид спорта', v: req.sport },
                { t: 'Обязательный риск', v: req.risk },
              ].map((item) => (
                <div
                  key={item.t}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <dt className="text-xs text-muted-foreground">{item.t}</dt>
                  <dd className="mt-1 font-medium text-foreground">{item.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Подходящие страховки
              </h2>
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
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {relevantProducts.map((p) => (
                <InsuranceProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4" />
                <span className="text-sm">Участники</span>
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {competition.participants.toLocaleString('ru-RU')}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Застраховано</span>
                  <span className="font-medium text-foreground">
                    {coveragePct}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width: `${coveragePct}%` }}
                  />
                </div>
              </div>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">С полисом</dt>
                  <dd className="font-medium text-success">
                    {competition.insured.toLocaleString('ru-RU')}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Без страховки</dt>
                  <dd className="font-medium text-destructive">
                    {competition.uninsured.toLocaleString('ru-RU')}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">На проверке</dt>
                  <dd className="font-medium text-warning-foreground">
                    {competition.toCheck.toLocaleString('ru-RU')}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border bg-foreground p-6 text-background">
              <h3 className="text-base font-semibold">Вы участник?</h3>
              <p className="mt-1.5 text-sm text-background/70 text-pretty">
                Оформите страховку под требования этого соревнования онлайн.
              </p>
              <Button
                className="mt-4 w-full bg-background text-foreground hover:bg-background/90"
                render={
                  <Link href={`/dashboard/competitions/${competition.slug}`}>
                    Застраховаться
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
