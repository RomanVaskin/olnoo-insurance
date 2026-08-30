import Image from 'next/image'
import Link from 'next/link'
import type { Sport } from '@/lib/data'

export function SportCard({ sport }: { sport: Sport }) {
  return (
    <Link
      href="/insurance"
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
    >
      <Image
        src={sport.image || '/placeholder.svg'}
        alt={sport.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-base font-semibold text-background">{sport.name}</h3>
        <p className="text-xs text-background/80">
          {sport.athletes} спортсменов
        </p>
      </div>
    </Link>
  )
}
