'use client'

import { Check, Clock, XCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import type { PaymentStatus } from '@/lib/payments-api'

export function PaymentResultPanel({
  status,
  applicationStatus,
  policyUrl,
  onRecheck,
  onRetry,
  busy,
}: {
  status: PaymentStatus
  applicationStatus?: string | null
  policyUrl?: string | null
  onRecheck?: () => void
  onRetry?: () => void
  busy?: boolean
}) {
  if (status === 'paid') {
    return (
      <section className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success">
          <Check className="size-7" />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          Оплата прошла
        </h2>
        {applicationStatus ? (
          <div className="mt-3 flex justify-center">
            <StatusBadge status={applicationStatus} tone="success" />
          </div>
        ) : null}
        {policyUrl ? (
          <a
            href={policyUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
          >
            <Download className="size-4" />
            Открыть полис
          </a>
        ) : (
          <p className="mt-5 text-sm text-muted-foreground text-pretty">
            Полис формируется и появится в разделе «Мои полисы».
          </p>
        )}
      </section>
    )
  }

  if (status === 'pending') {
    return (
      <section className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand/10 text-brand">
          <Clock className="size-7" />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          Платёж обрабатывается
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Обычно это занимает не больше нескольких минут. Вы можете проверить
          статус ещё раз.
        </p>
        <Button className="mt-5 h-11 px-6" onClick={onRecheck} disabled={busy}>
          {busy ? 'Проверяем…' : 'Проверить статус'}
        </Button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
        <XCircle className="size-7" />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
        Платёж отменён
      </h2>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">
        Вы можете попробовать оплатить ещё раз.
      </p>
      <Button className="mt-5 h-11 px-6" onClick={onRetry} disabled={busy}>
        {busy ? 'Создаём платёж…' : 'Повторить оплату'}
      </Button>
    </section>
  )
}
