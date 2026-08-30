import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InsurerLogo } from '@/components/brand'
import { StatusBadge } from '@/components/status-badge'
import { insurerById, type Policy } from '@/lib/data'

export function PolicyCard({ policy }: { policy: Policy }) {
  const insurer = insurerById(policy.insurerId)
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <InsurerLogo short={insurer?.short ?? '—'} name={insurer?.name} />
        <StatusBadge status={policy.status} />
      </div>

      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {policy.type}
        </h3>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
          № {policy.number}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Покрытие</dt>
          <dd className="font-medium text-foreground">{policy.coverage}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Срок действия</dt>
          <dd className="font-medium text-foreground">{policy.dates}</dd>
        </div>
      </dl>

      <div className="mt-1 border-t border-border pt-4">
        <Button variant="outline" className="w-full">
          <Download className="size-4" />
          Скачать полис PDF
        </Button>
      </div>
    </div>
  )
}
