import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'
import type { Competition } from '@/lib/data'
import { StatusBadge } from '@/components/status-badge'

export function EventCard({ competition }: { competition: Competition }) {
  return (
    <Link
      href={`/competitions/${competition.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-foreground/5"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={competition.image || '/placeholder.svg'}
          alt={competition.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
          {competition.sport}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold tracking-tight text-foreground text-balance">
          {competition.name}
        </h3>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            {competition.dateLabel}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            {competition.location}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            {competition.participants.toLocaleString('ru-RU')} участников
          </span>
          {competition.requirements.required ? (
            <StatusBadge status="Страховка обязательна" tone="brand" />
          ) : null}
        </div>
      </div>
    </Link>
  )
}
