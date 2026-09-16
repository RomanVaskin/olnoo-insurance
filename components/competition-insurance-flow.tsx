'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Check,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CalendarDays,
  MapPin,
} from 'lucide-react'
import type { Competition, Product } from '@/lib/data'
import { insurerById } from '@/lib/data'
import { Stepper } from '@/components/stepper'
import { StatusBadge } from '@/components/status-badge'
import { InsurerLogo } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { PaymentResultPanel } from '@/components/payment-result'
import { paymentsApi, type PaymentStatus } from '@/lib/payments-api'
import { savePendingPayment, readPendingPaymentId, clearPendingPayment } from '@/lib/payment-storage'
import { cn } from '@/lib/utils'

const STEPS = ['Требования', 'Выбор страховки', 'Данные', 'Оплата']

// Parse the "500 000 ₽" style string into a comparable number.
function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, '')
  return digits ? Number.parseInt(digits, 10) : 0
}

export function CompetitionInsuranceFlow({
  competition,
  products,
  applicationId,
}: {
  competition: Competition
  products: Product[]
  /** Real backend application to charge. Without it the payment step cannot be completed. */
  applicationId?: string
}) {
  const [step, setStep] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const isPaymentReturn = searchParams.get('payment') === 'return'

  const [creatingPayment, setCreatingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null)
  const [policyUrl, setPolicyUrl] = useState<string | null>(null)
  const [checkingStatus, setCheckingStatus] = useState(false)
  const [contextLost, setContextLost] = useState(false)

  async function checkPaymentStatus(id: string) {
    setCheckingStatus(true)
    setPaymentError(null)
    const res = await paymentsApi.status(id)
    if (!res.ok || !res.data) {
      setPaymentError('Не удалось проверить статус платежа. Попробуйте ещё раз.')
      setCheckingStatus(false)
      return
    }
    setPaymentStatus(res.data.status)
    if (res.data.status === 'paid') {
      const full = await paymentsApi.get(id)
      if (full.ok && full.data) {
        setApplicationStatus(full.data.application?.status ?? null)
        setPolicyUrl(full.data.policy?.policy_url ?? null)
      }
      clearPendingPayment()
    }
    setCheckingStatus(false)
  }

  async function startPayment() {
    if (!applicationId) return
    setPaymentError(null)
    setCreatingPayment(true)

    const returnUrl = `${window.location.origin}${window.location.pathname}?application_id=${applicationId}&payment=return`
    const res = await paymentsApi.create(applicationId, returnUrl)

    if (!res.ok || !res.data || !res.data.confirmation_url) {
      setPaymentError(
        res.errorCode === 'application_already_paid'
          ? 'Заявка уже оплачена.'
          : 'Не удалось создать платёж. Попробуйте ещё раз.',
      )
      setCreatingPayment(false)
      return
    }

    savePendingPayment({ applicationId, paymentId: res.data.payment_id })
    window.location.href = res.data.confirmation_url
  }

  // Return leg of the YooKassa redirect: recover payment_id for this application
  // (saved right before the redirect, since the create response is the only
  // place we ever learn it) and check the real status once.
  useEffect(() => {
    if (!isPaymentReturn || !applicationId) return
    const restoredId = readPendingPaymentId(applicationId)
    if (!restoredId) {
      setContextLost(true)
      return
    }
    setPaymentId(restoredId)
    void checkPaymentStatus(restoredId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaymentReturn, applicationId])

  if (isPaymentReturn) {
    return (
      <div className="space-y-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {competition.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Оплата полиса</p>
        </div>

        {contextLost ? (
          <section className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
            <AlertTriangle className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              Не удалось восстановить платёж
            </h2>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Проверьте статус оплаты в разделе «Мои полисы» или попробуйте
              оплатить заявку ещё раз.
            </p>
            <Button
              className="mt-5 h-11 px-6"
              render={<Link href="/dashboard/policies">Мои полисы</Link>}
            />
          </section>
        ) : paymentStatus === null ? (
          <section className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">Проверяем статус оплаты…</p>
          </section>
        ) : (
          <PaymentResultPanel
            status={paymentStatus}
            applicationStatus={applicationStatus}
            policyUrl={policyUrl}
            busy={checkingStatus || creatingPayment}
            onRecheck={() => paymentId && checkPaymentStatus(paymentId)}
            onRetry={() => void startPayment()}
          />
        )}
        {paymentError ? (
          <p className="text-center text-sm text-destructive">{paymentError}</p>
        ) : null}
      </div>
    )
  }

  const minCoverage = parseAmount(competition.requirements.minCoverage)

  const enrichedProducts = products.map((p) => {
    const meetsCoverage = parseAmount(p.coverage) >= minCoverage
    const meetsRisk = p.benefits.some((b) =>
      b.toLowerCase().includes('несчаст'),
    )
    return { product: p, compliant: meetsCoverage && meetsRisk, meetsCoverage }
  })

  const selected = enrichedProducts.find((e) => e.product.id === selectedId)

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {competition.name}
              </h1>
              <StatusBadge status={competition.sport} tone="neutral" />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {competition.dateLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {competition.location}
              </span>
            </div>
          </div>
          <StatusBadge status="Страховка обязательна" tone="brand" />
        </div>
        <div className="p-5">
          <Stepper steps={STEPS} current={step} />
        </div>
      </div>

      {step === 0 ? (
        <section className="space-y-6">
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-brand" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Требования организатора
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Чтобы участвовать, ваш полис должен соответствовать всем условиям
              ниже. На следующем шаге мы покажем только подходящие продукты.
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { t: 'Минимальное покрытие', v: competition.requirements.minCoverage },
                { t: 'Срок действия', v: competition.requirements.period },
                { t: 'Вид спорта', v: competition.requirements.sport },
                { t: 'Обязательный риск', v: competition.requirements.risk },
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
          </div>
          <div className="flex justify-end">
            <Button size="lg" className="h-11 px-6" onClick={() => setStep(1)}>
              Подобрать страховку
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Подходящие страховки
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Продукты, отмеченные зелёным, полностью соответствуют требованиям
              соревнования.
            </p>
          </div>

          <div className="grid gap-4">
            {enrichedProducts.map(({ product, compliant, meetsCoverage }) => {
              const insurer = insurerById(product.insurerId)
              const isSelected = selectedId === product.id
              return (
                <button
                  key={product.id}
                  type="button"
                  disabled={!compliant}
                  onClick={() => setSelectedId(product.id)}
                  className={cn(
                    'flex flex-col gap-4 rounded-2xl border p-5 text-left transition-all sm:flex-row sm:items-center sm:justify-between',
                    isSelected
                      ? 'border-brand ring-2 ring-brand/30'
                      : 'border-border hover:border-brand/40',
                    !compliant && 'cursor-not-allowed opacity-60',
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border',
                        isSelected
                          ? 'border-brand bg-brand text-brand-foreground'
                          : 'border-border',
                      )}
                    >
                      {isSelected ? <Check className="size-3.5" /> : null}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {product.name}
                        </h3>
                        {compliant ? (
                          <StatusBadge
                            status="Соответствует требованиям"
                            tone="success"
                          />
                        ) : (
                          <StatusBadge
                            status={
                              meetsCoverage
                                ? 'Нет нужного риска'
                                : 'Недостаточное покрытие'
                            }
                            tone="danger"
                          />
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <InsurerLogo short={insurer?.short ?? '—'} />
                        <span className="text-sm text-muted-foreground">
                          {insurer?.name}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                        <span className="text-muted-foreground">
                          Покрытие:{' '}
                          <span className="font-medium text-foreground">
                            {product.coverage}
                          </span>
                        </span>
                        <span className="text-muted-foreground">
                          Риски:{' '}
                          <span className="font-medium text-foreground">
                            {product.benefits.join(', ')}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">{product.period}</p>
                    <p className="text-xl font-semibold tracking-tight text-foreground">
                      {product.price}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(0)}>
              <ArrowLeft className="size-4" />
              Назад
            </Button>
            <Button
              size="lg"
              className="h-11 px-6"
              disabled={!selected}
              onClick={() => setStep(2)}
            >
              Продолжить
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Данные спортсмена
          </h2>
          <div className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
            {[
              { l: 'Фамилия и имя', v: 'Алексей Иванов' },
              { l: 'Дата рождения', v: '12.04.2002' },
              { l: 'Спортивный клуб', v: 'СК «Самбо-70»' },
              { l: 'Разряд', v: 'КМС' },
              { l: 'Телефон', v: '+7 900 000-00-00' },
              { l: 'Email', v: 'a.ivanov@example.ru' },
            ].map((f) => (
              <label key={f.l} className="block">
                <span className="text-sm text-muted-foreground">{f.l}</span>
                <input
                  defaultValue={f.v}
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="size-4" />
              Назад
            </Button>
            <Button size="lg" className="h-11 px-6" onClick={() => setStep(3)}>
              К оплате
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Подтверждение и оплата
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-medium text-foreground">
                  Способ оплаты
                </h3>
                <div className="mt-4 space-y-3">
                  {['Банковская карта', 'СБП', 'Счёт для юр. лиц'].map(
                    (m, i) => (
                      <label
                        key={m}
                        className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm text-foreground"
                      >
                        <input
                          type="radio"
                          name="pay"
                          defaultChecked={i === 0}
                          className="accent-[var(--brand)]"
                        />
                        {m}
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-medium text-foreground">Ваш заказ</h3>
              {selected ? (
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Продукт</dt>
                    <dd className="font-medium text-foreground">
                      {selected.product.name}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Покрытие</dt>
                    <dd className="font-medium text-foreground">
                      {selected.product.coverage}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Соревнование</dt>
                    <dd className="max-w-[55%] text-right font-medium text-foreground">
                      {competition.name}
                    </dd>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-border pt-3">
                    <dt className="text-muted-foreground">Итого</dt>
                    <dd className="text-lg font-semibold text-foreground">
                      {selected.product.price}
                    </dd>
                  </div>
                </dl>
              ) : null}
              <Button
                size="lg"
                className="mt-5 h-11 w-full"
                disabled={!applicationId || creatingPayment}
                onClick={() => void startPayment()}
              >
                {creatingPayment ? 'Создаём платёж…' : 'Оплатить и оформить'}
              </Button>
              {!applicationId ? (
                <p className="mt-3 text-xs text-muted-foreground text-pretty">
                  Нет активной заявки для оплаты.
                </p>
              ) : null}
              {paymentError ? (
                <p className="mt-3 text-xs text-destructive text-pretty">
                  {paymentError}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-start">
            <Button variant="ghost" onClick={() => setStep(2)}>
              <ArrowLeft className="size-4" />
              Назад
            </Button>
          </div>
        </section>
      ) : null}

      {!selected && step === 1 ? (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Выберите один из подходящих продуктов, чтобы продолжить оформление.
          </p>
        </div>
      ) : null}
    </div>
  )
}
