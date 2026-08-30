import { Search, SlidersHorizontal } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type FilterDef = {
  label: string
  options: string[]
}

export function FilterBar({
  filters = [],
  searchPlaceholder = 'Поиск…',
  trailing,
  className,
}: {
  filters?: FilterDef[]
  searchPlaceholder?: string
  trailing?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-border bg-card p-3 md:flex-row md:items-center',
        className,
      )}
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          className="h-9 w-full rounded-lg border border-border bg-background pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <select
            key={f.label}
            aria-label={f.label}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              {f.label}
            </option>
            {f.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}
        {filters.length === 0 ? (
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <SlidersHorizontal className="size-4" />
            Фильтры
          </button>
        ) : null}
        {trailing}
      </div>
    </div>
  )
}
