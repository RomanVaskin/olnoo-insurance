import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stepper({
  steps,
  current,
  className,
}: {
  steps: string[]
  current: number
  className?: string
}) {
  return (
    <ol className={cn('flex flex-wrap items-center gap-x-2 gap-y-3', className)}>
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={cn(
                'grid size-6 place-items-center rounded-full border text-xs font-medium',
                done && 'border-brand bg-brand text-brand-foreground',
                active && 'border-brand bg-brand/10 text-brand',
                !done && !active && 'border-border bg-card text-muted-foreground',
              )}
            >
              {done ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span
              className={cn(
                'text-sm',
                active ? 'font-medium text-foreground' : 'text-muted-foreground',
              )}
            >
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className="mx-1 hidden h-px w-8 bg-border sm:block"
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
