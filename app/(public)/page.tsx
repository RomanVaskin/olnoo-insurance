import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/hero-section'
import { CategoryGrid } from '@/components/sections/category-grid'
import { HowItWorks } from '@/components/sections/how-it-works'
import { TrustedProviders } from '@/components/sections/trusted-providers'
import { WhyOlnoo } from '@/components/sections/why-olnoo'
import { PartnersCta } from '@/components/sections/partners-cta'
import { SportCard } from '@/components/sport-card'
import { sports } from '@/lib/data'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedProviders />
      <CategoryGrid />

      {/* Featured category: Sport */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wide text-brand uppercase">
                Главное направление
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
                Страхование спорта
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
                Полисы для соревнований, тренировок и профессиональных
                спортсменов. Оформляйте страховку прямо со страницы турнира.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="h-11 shrink-0 px-6 text-[15px]"
              render={
                <Link href="/sport">
                  Перейти в раздел «Спорт»
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {sports.map((s) => (
              <SportCard key={s.slug} sport={s} />
            ))}
          </div>
        </div>
      </section>

      <WhyOlnoo />
      <HowItWorks />
      <PartnersCta />
    </>
  )
}
