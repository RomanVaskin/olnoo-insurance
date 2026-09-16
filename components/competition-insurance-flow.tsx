'use client'

import { useEffect, useRef, useState } from 'react'
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
import type { Competition } from '@/lib/data'
import { Stepper } from '@/components/stepper'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { PaymentResultPanel } from '@/components/payment-result'
import { paymentsApi, type PaymentStatus } from '@/lib/payments-api'
import {
  athleteApi,
  applicationsApi,
  type AthleteProduct,
  type AthleteProfile,
} from '@/lib/athlete-api'
import { savePendingPayment, readPendingPaymentId, clearPendingPayment } from '@/lib/payment-storage'
import { cn } from '@/lib/utils'

const STEPS = ['Требования', 'Выбор страховки', 'Данные', 'Оплата']

// Parse the "500 000 ₽" style string into a comparable number.
function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, '')
  return digits ? Number.parseInt(digits, 10) : 0
}

function formatRub(kopecks: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(kopecks / 100)
}

function formatBirthdate(value: string | null) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('ru-RU').format(date)
}

export function CompetitionInsuranceFlow({
  competition,
  applicationId: initialApplicationId,
}: {
  competition: Competition
  /** Real backend application id, present only when returning from the YooKassa redirect. */
  applicationId?: string
}) {
  const [step, setStep] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const isPaymentReturn = searchParams.get('payment') === 'return'

  const [profile, setProfile] = useState<AthleteProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [products, setProducts] = useState<AthleteProduct[] | null>(null)
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)

  const [applicationId, setApplicationId] = useState<string | null>(initialApplicationId ?? null)
  const [creatingApplication, setCreatingApplication] = useState(false)
  const [applicationError, setApplicationError] = useState<string | null>(null)
  // Refs (not state) so a double-click or a re-render before the create request
  // resolves can never fire a second POST /api/applications for the same product.
  const createdForProductId = useRef<string | null>(null)
  const creationInFlight = useRef(false)

  const [creatingPayment, setCreatingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null)
  const [policyUrl, setPolicyUrl] = useState<string | null>(null)
  const [checkingStatus, setCheckingStatus] = useState(false)
  const [contextLost, setContextLost] = useState(false)

  // Return leg only needs the payment/application status check below, not the
  // pre-payment profile/product data.
  useEffect(() => {
    if (isPaymentReturn) return
    let active = true
    athleteApi.profile().then((res) => {
      if (!active) return
      if (res.ok && res.data) {
        setProfile(res.data)
      } else {
        setProfileError('Не удалось загрузить данные спортсмена.')
      }
      setProfileLoading(false)
    })
    return () => {
      active = false
    }
  }, [isPaymentReturn])

  useEffect(() => {
    if (isPaymentReturn) return
    let active = true
    athleteApi.products().then((res) => {
      if (!active) return
      if (res.ok && res.data) {
        setProducts(res.data)
      } else {
        setProductsError('Не удалось загрузить список страховых продуктов.')
      }
      setProductsLoading(false)
    })
    return () => {
      active = false
    }
  }, [isPaymentReturn])

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

  // Creates the real backend application for the selected product, exactly once.
  // Guarded by refs (synchronous, unlike state) so a double-click or a re-render
  // firing before the first request resolves can never create a duplicate.
  async function ensureApplication(productId: string): Promise<string | null> {
    if (applicationId && createdForProductId.current === productId) {
      return applicationId
    }
    if (creationInFlight.current) {
      return null
    }

    creationInFlight.current = true
    setCreatingApplication(true)
    setApplicationError(null)

    const res = await applicationsApi.create(productId)

    creationInFlight.current = false
    setCreatingApplication(false)

    if (!res.ok || !res.data) {
      setApplicationError('Не удалось создать заявку. Попробуйте ещё раз.')
      return null
    }

    createdForProductId.current = productId
    setApplicationId(res.data.application_id)
    return res.data.application_id
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

  const productItems = (products ?? []).map((product) => {
    const coverageRub =
      product.coverage_amount_kopecks !== null ? product.coverage_amount_kopecks / 100 : null
    // null means the backend doesn't have a coverage figure for this product —
    // we don't fabricate a pass/fail badge in that case.
    const meetsCoverage = coverageRub === null ? null : coverageRub >= minCoverage
    return { product, meetsCoverage }
  })

  const selected = productItems.find((item) => item.product.product_id === selectedId)

  const membership =
    profile?.federation_memberships.find(
      (m) => m.federation?.id === selected?.product.federation.id,
    ) ?? profile?.federation_memberships[0] ?? null

  const profileFields = profile
    ? [
        {
          l: 'Фамилия, имя и отчество',
          v: [profile.person.last_name, profile.person.first_name, profile.person.patronymic]
            .filter(Boolean)
            .join(' '),
        },
        { l: 'Дата рождения', v: formatBirthdate(profile.person.birthdate) },
        { l: 'Федерация', v: membership?.federation?.name ?? null },
        { l: 'Спортивный клуб', v: membership?.club ?? null },
        { l: 'Тренер', v: membership?.coach ?? null },
        { l: 'Разряд', v: membership?.grade ?? null },
        { l: 'Вид спорта', v: membership?.sport_name ?? null },
        {
          l: 'Вес',
          v: membership?.weight !== null && membership?.weight !== undefined
            ? `${membership.weight} кг`
            : null,
        },
        { l: 'Телефон', v: profile.person.phone },
        { l: 'Email', v: profile.person.email },
      ]
    : []

  async function handleProceedToPayment() {
    if (!selected) return
    const id = await ensureApplication(selected.product.product_id)
    if (id) {
      setStep(3)
    }
  }

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

          {productsLoading ? (
            <p className="text-sm text-muted-foreground">Загружаем доступные продукты…</p>
          ) : productsError ? (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{productsError}</p>
            </div>
          ) : productItems.length === 0 ? (
            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
              Для вашей федерации пока нет доступных страховых продуктов.
            </div>
          ) : (
            <div className="grid gap-4">
              {productItems.map(({ product, meetsCoverage }) => {
                const isSelected = selectedId === product.product_id
                const disabled = meetsCoverage === false
                return (
                  <button
                    key={product.product_id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedId(product.product_id)}
                    className={cn(
                      'flex flex-col gap-4 rounded-2xl border p-5 text-left transition-all sm:flex-row sm:items-center sm:justify-between',
                      isSelected
                        ? 'border-brand ring-2 ring-brand/30'
                        : 'border-border hover:border-brand/40',
                      disabled && 'cursor-not-allowed opacity-60',
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
                          {meetsCoverage === true ? (
                            <StatusBadge
                              status="Соответствует требованиям"
                              tone="success"
                            />
                          ) : meetsCoverage === false ? (
                            <StatusBadge
                              status="Недостаточное покрытие"
                              tone="danger"
                            />
                          ) : null}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                          <span>{product.insurer_name ?? 'Страховщик не указан'}</span>
                          <span>·</span>
                          <span>{product.federation.name}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                          <span className="text-muted-foreground">
                            Покрытие:{' '}
                            <span className="font-medium text-foreground">
                              {product.coverage_amount_kopecks !== null
                                ? formatRub(product.coverage_amount_kopecks)
                                : '—'}
                            </span>
                          </span>
                          <span className="text-muted-foreground">
                            Срок действия:{' '}
                            <span className="font-medium text-foreground">
                              {product.validity_days} дн.
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xl font-semibold tracking-tight text-foreground">
                        {formatRub(product.amount_kopecks)}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

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

          {profileLoading ? (
            <p className="text-sm text-muted-foreground">Загружаем данные спортсмена…</p>
          ) : profileError ? (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{profileError}</p>
            </div>
          ) : profile ? (
            <div className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
              {profileFields.map((f) => (
                <div key={f.l} className="block">
                  <span className="text-sm text-muted-foreground">{f.l}</span>
                  <div className="mt-1.5 flex h-10 w-full items-center rounded-lg border border-border bg-background px-3 text-sm text-foreground">
                    {f.v ?? '—'}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {applicationError ? (
            <p className="text-sm text-destructive">{applicationError}</p>
          ) : null}

          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(1)} disabled={creatingApplication}>
              <ArrowLeft className="size-4" />
              Назад
            </Button>
            <Button
              size="lg"
              className="h-11 px-6"
              disabled={!selected || !profile || creatingApplication}
              onClick={() => void handleProceedToPayment()}
            >
              {creatingApplication ? 'Создаём заявку…' : 'К оплате'}
              {!creatingApplication ? <ArrowRight className="size-4" /> : null}
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
                      {selected.product.coverage_amount_kopecks !== null
                        ? formatRub(selected.product.coverage_amount_kopecks)
                        : '—'}
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
                      {formatRub(selected.product.amount_kopecks)}
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

      {!selected && step === 1 && !productsLoading && !productsError && productItems.length > 0 ? (
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
