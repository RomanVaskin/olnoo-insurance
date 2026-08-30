import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
  subtle = false,
}: {
  className?: string
  href?: string
  subtle?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
      >
        <span className="font-mono text-sm font-semibold tracking-tight">
          O
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          OLNOO{' '}
          <span className={cn(subtle && 'text-muted-foreground')}>
            Insurance
          </span>
        </span>
      </span>
    </Link>
  )
}

export function InsurerLogo({
  short,
  name,
  className,
}: {
  short: string
  name?: string
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-secondary text-[11px] font-semibold text-foreground"
      >
        {short}
      </span>
      {name ? (
        <span className="text-sm font-medium text-foreground">{name}</span>
      ) : null}
    </span>
  )
}
