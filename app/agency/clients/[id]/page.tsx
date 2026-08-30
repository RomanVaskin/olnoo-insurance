import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShieldCheck, Plus, Trophy } from 'lucide-react'
import { participants, policies, competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { PolicyCard } from '@/components/policy-card'
import { Button } from '@/components/ui/button'

export function generateStaticParams() {
  return participants.map((p) => ({ id: p.id }))
}

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const client = participants.find((p) => p.id === id)
  if (!client) notFound()

  const hasPolicy = client.status !== 'Нет страховки'
  const clientPolicies = hasPolicy ? policies.slice(0, 2) : []

  return (
    <div className="space-y-8">
      <Link
        href="/agency/clients"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Все клиенты
      </Link>

      <PageHeader
        eyebrow="Профиль клиента"
        title={client.name}
        description={`${client.club} · Дата рождения ${client.birth}`}
        actions={
          <>
            <StatusBadge status={client.status} />
            <Button>
              <Plus className="size-4" />
              Оформить полис
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Полисы клиента
            </h2>
            {clientPolicies.length > 0 ? (
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {clientPolicies.map((p) => (
                  <PolicyCard key={p.id} policy={p} />
                ))}
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-warning/40 bg-warning/5 p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-warning-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      Нет активных полисов
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Оформите страховку, чтобы клиент мог участвовать в
                      соревнованиях.
                    </p>
                  </div>
                </div>
                <Button>Оформить</Button>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Соревнования
            </h2>
            <div className="mt-4 space-y-3">
              {competitions.slice(0, 2).map((c) => (
                <div
                  key={c.slug}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-secondary text-muted-foreground">
                      <Trophy className="size-4" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {c.dateLabel}
                      </p>
                    </div>
                  </div>
                  <StatusBadge
                    status={hasPolicy ? 'Готов к участию' : 'Нужна страховка'}
                    tone={hasPolicy ? 'success' : 'warning'}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-foreground">Данные</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                { t: 'Клуб', v: client.club },
                { t: 'Дата рождения', v: client.birth },
                { t: 'Текущий полис', v: client.policy },
                { t: 'Покрытие', v: client.coverage },
                { t: 'Срок действия', v: client.validity },
              ].map((row) => (
                <div key={row.t} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{row.t}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
