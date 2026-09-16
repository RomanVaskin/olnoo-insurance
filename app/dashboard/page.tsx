'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Clock, FileText, Wallet, ArrowRight, AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  athleteApi,
  applicationsApi,
  type AthleteProfile,
  type AthleteApplication,
} from '@/lib/athlete-api'

const STATUS_LABELS: Record<AthleteApplication['status'], string> = {
  draft: 'Черновик',
  pending_payment: 'Ожидает оплаты',
  paid: 'Оплачен',
  policy_issued: 'Полис оформлен',
  cancelled: 'Отменена',
}

function formatRub(kopecks: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(kopecks / 100)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU').format(new Date(value))
}

export default function CustomerDashboardPage() {
  const [profile, setProfile] = useState<AthleteProfile | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [applications, setApplications] = useState<AthleteApplication[] | null>(null)
  const [applicationsError, setApplicationsError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    athleteApi.profile().then(({ ok, data }) => {
      if (!active) return
      if (ok && data) {
        setProfile(data)
      } else {
        setProfileError('Не удалось загрузить данные спортсмена.')
      }
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    applicationsApi.list().then(({ ok, data }) => {
      if (!active) return
      if (ok && data) {
        setApplications(data)
      } else {
        setApplicationsError('Не удалось загрузить заявки.')
      }
    })
    return () => {
      active = false
    }
  }, [])

  const fullName = profile
    ? [profile.person.last_name, profile.person.first_name, profile.person.patronymic]
        .filter(Boolean)
        .join(' ')
    : null

  const activePolicies = (applications ?? []).filter(
    (a) => a.status === 'paid' || a.status === 'policy_issued',
  )
  const pending = (applications ?? []).filter(
    (a) => a.status === 'pending_payment' || a.status === 'draft',
  )
  const totalPaidKopecks = activePolicies.reduce((sum, a) => sum + a.amount_kopecks, 0)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Личный кабинет"
        title={fullName ? `Добро пожаловать, ${fullName}` : 'Личный кабинет'}
        description="Управляйте своими полисами и проверяйте страховые требования соревнований."
        actions={
          <Button
            render={
              <Link href="/insurance">
                Оформить полис
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />

      {profileError ? (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{profileError}</p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Активные полисы"
          value={applications ? String(activePolicies.length) : '—'}
          icon={ShieldCheck}
          hint="Оплаченные заявки"
        />
        <StatCard
          label="Ожидают оплаты"
          value={applications ? String(pending.length) : '—'}
          icon={Clock}
          hint="Требуют завершения"
        />
        <StatCard
          label="Всего заявок"
          value={applications ? String(applications.length) : '—'}
          icon={FileText}
          hint="За всё время"
        />
        <StatCard
          label="Оплачено всего"
          value={applications ? formatRub(totalPaidKopecks) : '—'}
          icon={Wallet}
          hint="По оплаченным заявкам"
        />
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Мои заявки
          </h2>
        </div>

        {applicationsError ? (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{applicationsError}</p>
          </div>
        ) : applications === null ? (
          <p className="mt-4 text-sm text-muted-foreground">Загружаем заявки…</p>
        ) : applications.length === 0 ? (
          <div className="mt-4 rounded-xl border border-border bg-secondary/50 p-6 text-center text-sm text-muted-foreground">
            У вас пока нет заявок на страхование.
          </div>
        ) : (
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {applications.map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {a.product.name}
                  </h3>
                  <StatusBadge status={STATUS_LABELS[a.status]} />
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Федерация</dt>
                    <dd className="font-medium text-foreground">
                      {a.federation?.name ?? '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Сумма</dt>
                    <dd className="font-medium text-foreground">
                      {formatRub(a.amount_kopecks)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Создана</dt>
                    <dd className="font-medium text-foreground">
                      {formatDate(a.created_at)}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
