import { cn } from '@/lib/utils'

type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'brand'

const toneMap: Record<Tone, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/15 text-warning-foreground border-warning/30',
  danger: 'bg-destructive/10 text-destructive border-destructive/20',
  neutral: 'bg-secondary text-muted-foreground border-border',
  brand: 'bg-brand/10 text-brand border-brand/20',
}

const statusTone: Record<string, Tone> = {
  Подтверждена: 'success',
  Активна: 'success',
  Активен: 'success',
  'Нет страховки': 'danger',
  'Истекает слишком рано': 'warning',
  Истекает: 'warning',
  'Требует проверки': 'warning',
  'На модерации': 'warning',
  'Ожидает оплаты': 'brand',
  Архив: 'neutral',
}

export function StatusBadge({
  status,
  tone,
  className,
}: {
  status: string
  tone?: Tone
  className?: string
}) {
  const resolved = tone ?? statusTone[status] ?? 'neutral'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        toneMap[resolved],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-1.5 rounded-full',
          resolved === 'success' && 'bg-success',
          resolved === 'warning' && 'bg-warning',
          resolved === 'danger' && 'bg-destructive',
          resolved === 'brand' && 'bg-brand',
          resolved === 'neutral' && 'bg-muted-foreground',
        )}
      />
      {status}
    </span>
  )
}
