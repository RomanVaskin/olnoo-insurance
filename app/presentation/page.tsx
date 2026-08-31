'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Users,
  Building2,
  Handshake,
  ShieldCheck,
  Trophy,
  Store,
  UserCircle,
  Briefcase,
  Landmark,
  Settings2,
  FileText,
  CreditCard,
  BarChart3,
  Plug,
  ScanLine,
  Send,
  Database,
  ShoppingCart,
  Wallet,
  LineChart,
  Percent,
  KeyRound,
  Palette,
  FileSignature,
  Rocket,
  TrendingUp,
  ListChecks,
  Repeat,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '@/components/brand'
import { Button } from '@/components/ui/button'

/* ------------------------------------------------------------------ *
 * Editable presentation content — change any string/array below.
 * ------------------------------------------------------------------ */

const flowSteps = [
  { icon: Users, label: 'Клиент / Партнёр' },
  { icon: ShieldCheck, label: 'OLNOO' },
  { icon: FileText, label: 'Продукт' },
  { icon: CreditCard, label: 'Оплата' },
  { icon: FileSignature, label: 'Полис' },
  { icon: BarChart3, label: 'Аналитика' },
]

const insurerBenefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Store, title: 'Новый канал продаж', text: 'Прямой доступ к клиентам и партнёрским аудиториям.' },
  { icon: Percent, title: 'Ниже издержки', text: 'Меньше ручных операций и бумажного документооборота.' },
  { icon: Settings2, title: 'Автоматизация', text: 'Выпуск полисов и расчёты проходят на платформе.' },
  { icon: BarChart3, title: 'Аналитика', text: 'Прозрачная воронка, продажи и статистика по продуктам.' },
]

const brokerBenefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FileText, title: 'Мультипродукт', text: 'Дистрибуция продуктов нескольких страховых компаний.' },
  { icon: Users, title: 'Лиды', text: 'Входящие заявки от клиентов и партнёров платформы.' },
  { icon: Wallet, title: 'Комиссии', text: 'Прозрачный учёт вознаграждения по каждой сделке.' },
  { icon: LineChart, title: 'Отчёты и масштаб', text: 'Отчётность и инструменты для роста портфеля.' },
]

const partnerBenefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Trophy, title: 'Страницы событий', text: 'Страницы федерации, клуба и соревнования на платформе.' },
  { icon: ShieldCheck, title: 'Статус участников', text: 'Контроль статуса страховки каждого участника.' },
  { icon: Handshake, title: 'Revenue share', text: 'Доля от страховых продуктов, оформленных через партнёра.' },
]

const sportFlow = [
  { label: 'Соревнование' },
  { label: 'Участник' },
  { label: 'Страховка' },
  { label: 'Полис' },
  { label: 'Статус в федерации' },
]

const modules: { icon: LucideIcon; title: string }[] = [
  { icon: ShoppingCart, title: 'Маркетплейс' },
  { icon: UserCircle, title: 'Кабинет клиента' },
  { icon: Briefcase, title: 'Агентство' },
  { icon: Landmark, title: 'Федерация' },
  { icon: Settings2, title: 'Администрирование' },
  { icon: FileText, title: 'Полисы' },
  { icon: CreditCard, title: 'Платежи' },
  { icon: BarChart3, title: 'Аналитика' },
]

const integrations: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: 'Страховые и брокеры', text: 'Подключение продуктов и обмен данными.' },
  { icon: CreditCard, title: 'Платежи', text: 'Онлайн-оплата и эквайринг.' },
  { icon: ScanLine, title: 'OCR', text: 'Распознавание документов и данных.' },
  { icon: Send, title: 'Telegram / Email', text: 'Уведомления и коммуникации.' },
  { icon: Database, title: 'CRM', text: 'Синхронизация клиентов и сделок.' },
]

const terms: { icon: LucideIcon; title: string }[] = [
  { icon: Settings2, title: 'Подключение и настройка' },
  { icon: Percent, title: 'Комиссия' },
  { icon: Handshake, title: 'Revenue share' },
  { icon: Plug, title: 'API-интеграция' },
  { icon: Palette, title: 'White-label' },
  { icon: FileSignature, title: 'Индивидуальные условия' },
]

const stages: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ListChecks, title: 'Онбординг', text: 'Знакомство и определение целей.' },
  { icon: Settings2, title: 'Настройка', text: 'Продукты, страницы и роли.' },
  { icon: Plug, title: 'Интеграция', text: 'Подключение систем и данных.' },
  { icon: Rocket, title: 'Запуск', text: 'Старт продаж на платформе.' },
  { icon: TrendingUp, title: 'Масштабирование', text: 'Рост каналов и объёмов.' },
]

/* ------------------------------------------------------------------ *
 * Slide primitives
 * ------------------------------------------------------------------ */

function Slide({
  index,
  eyebrow,
  tone = 'default',
  children,
}: {
  index: number
  eyebrow?: string
  tone?: 'default' | 'card' | 'primary'
  children: React.ReactNode
}) {
  const toneClass =
    tone === 'primary'
      ? 'bg-primary text-primary-foreground'
      : tone === 'card'
        ? 'bg-card border-y border-border'
        : 'bg-background'
  return (
    <section
      className={`relative flex min-h-screen snap-start flex-col justify-center ${toneClass}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-10 flex items-center justify-between">
          <span
            className={`text-xs font-medium tracking-wide uppercase ${
              tone === 'primary' ? 'text-primary-foreground/70' : 'text-brand'
            }`}
          >
            {eyebrow}
          </span>
          <span
            className={`font-mono text-xs ${
              tone === 'primary'
                ? 'text-primary-foreground/50'
                : 'text-muted-foreground'
            }`}
          >
            {String(index).padStart(2, '0')} / 12
          </span>
        </div>
        {children}
      </div>
    </section>
  )
}

function SlideTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-4xl font-semibold tracking-tight text-balance lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  )
}

function FlowRow({
  items,
  tone = 'default',
}: {
  items: { icon?: LucideIcon; label: string }[]
  tone?: 'default' | 'primary'
}) {
  const chip =
    tone === 'primary'
      ? 'border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground'
      : 'border-border bg-card text-foreground'
  const arrow =
    tone === 'primary' ? 'text-primary-foreground/40' : 'text-muted-foreground'
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((it, i) => (
        <div key={it.label} className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 ${chip}`}
          >
            {it.icon ? <it.icon className="size-4 shrink-0" /> : null}
            <span className="text-sm font-medium whitespace-nowrap">
              {it.label}
            </span>
          </div>
          {i < items.length - 1 ? (
            <ArrowRight className={`size-4 shrink-0 ${arrow}`} />
          ) : null}
        </div>
      ))}
    </div>
  )
}

function BenefitGrid({
  items,
  cols = 'lg:grid-cols-4',
}: {
  items: { icon: LucideIcon; title: string; text: string }[]
  cols?: string
}) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((b) => (
        <div
          key={b.title}
          className="rounded-xl border border-border bg-card p-6"
        >
          <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-foreground">
            <b.icon className="size-5" />
          </span>
          <h3 className="mt-5 text-base font-semibold text-foreground">
            {b.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {b.text}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default function PresentationPage() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
      {/* 01 — Cover */}
      <Slide index={1} eyebrow="Презентация" tone="primary">
        <div className="max-w-3xl">
          <Logo
            href="/"
            className="[&_span]:text-primary-foreground [&>span:first-child]:bg-primary-foreground [&>span:first-child_span]:text-primary"
          />
          <h1 className="mt-12 text-5xl font-semibold tracking-tight text-balance lg:text-7xl">
            OLNOO Insurance
          </h1>
          <p className="mt-6 text-2xl text-primary-foreground/80 lg:text-3xl">
            Страхование проще.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href="#platform">Обзор платформы</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<Link href="/">На сайт</Link>}
            />
          </div>
        </div>
      </Slide>

      {/* 02 — What is OLNOO */}
      <Slide index={2} eyebrow="О платформе">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SlideTitle className="text-foreground">
              Единая платформа для рынка страхования
            </SlideTitle>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              OLNOO Insurance соединяет клиентов, брокеров, страховые компании и
              партнёров в одном пространстве — от выбора продукта до полиса и
              аналитики.
            </p>
          </div>
          <BenefitGrid
            cols="lg:grid-cols-2"
            items={[
              { icon: Users, title: 'Клиенты', text: 'Выбор и оформление онлайн.' },
              { icon: Briefcase, title: 'Брокеры', text: 'Дистрибуция и комиссии.' },
              { icon: Building2, title: 'Страховые', text: 'Новый канал продаж.' },
              { icon: Handshake, title: 'Партнёры', text: 'События и revenue share.' },
            ]}
          />
        </div>
      </Slide>

      {/* 03 — How it works */}
      <Slide index={3} eyebrow="Как это работает" tone="card">
        <SlideTitle className="text-foreground">
          От заявки до аналитики
        </SlideTitle>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
          Единый сквозной процесс для всех участников.
        </p>
        <div className="mt-12">
          <FlowRow items={flowSteps} />
        </div>
      </Slide>

      {/* 04 — Benefits for insurers */}
      <Slide index={4} eyebrow="Страховым компаниям">
        <SlideTitle className="text-foreground">
          Продавайте больше и дешевле
        </SlideTitle>
        <div className="mt-12">
          <BenefitGrid items={insurerBenefits} />
        </div>
      </Slide>

      {/* 05 — Benefits for brokers */}
      <Slide index={5} eyebrow="Брокерам" tone="card">
        <SlideTitle className="text-foreground">
          Один кабинет для всей дистрибуции
        </SlideTitle>
        <div className="mt-12">
          <BenefitGrid items={brokerBenefits} />
        </div>
      </Slide>

      {/* 06 — Benefits for partners */}
      <Slide index={6} eyebrow="Партнёрам">
        <SlideTitle className="text-foreground">
          Монетизируйте свою аудиторию
        </SlideTitle>
        <div className="mt-12">
          <BenefitGrid items={partnerBenefits} cols="lg:grid-cols-3" />
        </div>
      </Slide>

      {/* 07 — Sports insurance */}
      <Slide index={7} eyebrow="Первая вертикаль" tone="primary">
        <div className="max-w-3xl">
          <SlideTitle>Спортивное страхование</SlideTitle>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            Соревнования, участники и федерации — с подтверждённым статусом
            страховки на каждом этапе.
          </p>
        </div>
        <div className="mt-12">
          <FlowRow items={sportFlow} tone="primary" />
        </div>
      </Slide>

      {/* 08 — Platform modules */}
      <Slide index={8} eyebrow="Модули платформы">
        <div id="platform" className="scroll-mt-24">
          <SlideTitle className="text-foreground">Всё в одной системе</SlideTitle>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {modules.map((m) => (
            <div
              key={m.title}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-5"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-secondary text-foreground">
                <m.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                {m.title}
              </span>
            </div>
          ))}
        </div>
      </Slide>

      {/* 09 — Integrations */}
      <Slide index={9} eyebrow="Интеграции" tone="card">
        <SlideTitle className="text-foreground">
          Подключается к вашему стеку
        </SlideTitle>
        <div className="mt-12">
          <BenefitGrid
            items={integrations}
            cols="lg:grid-cols-5"
          />
        </div>
      </Slide>

      {/* 10 — Terms */}
      <Slide index={10} eyebrow="Условия сотрудничества">
        <SlideTitle className="text-foreground">Гибкая модель</SlideTitle>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
          Формат и коммерческие условия обсуждаются индивидуально.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-5"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-secondary text-foreground">
                <t.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                {t.title}
              </span>
            </div>
          ))}
        </div>
      </Slide>

      {/* 11 — Launch stages */}
      <Slide index={11} eyebrow="Этапы запуска" tone="card">
        <SlideTitle className="text-foreground">Путь к запуску</SlideTitle>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s, i) => (
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
      </Slide>

      {/* 12 — Final CTA */}
      <Slide index={12} eyebrow="Начнём" tone="primary">
        <div className="max-w-3xl">
          <SlideTitle>Обсудим сотрудничество</SlideTitle>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            Покажем платформу, обсудим вашу модель и условия подключения.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href="/partners">Обсудить сотрудничество</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={
                <Link href="/">
                  Перейти на сайт
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              }
            />
          </div>
          <div className="mt-16 flex items-center gap-3 text-primary-foreground/60">
            <Repeat className="size-4" />
            <span className="text-sm">
              OLNOO Insurance — страхование проще.
            </span>
          </div>
        </div>
      </Slide>
    </main>
  )
}
