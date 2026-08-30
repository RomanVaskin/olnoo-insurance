import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InsurerLogo } from '@/components/brand'
import { insurerById, type Product } from '@/lib/data'
import { cn } from '@/lib/utils'

export function InsuranceProductCard({
  product,
  highlight = false,
}: {
  product: Product
  highlight?: boolean
}) {
  const insurer = insurerById(product.insurerId)
  const featured = highlight || product.best
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-card p-5 transition-all hover:shadow-lg hover:shadow-foreground/5',
        featured ? 'border-brand ring-1 ring-brand/30' : 'border-border',
      )}
    >
      {featured ? (
        <span className="absolute -top-2.5 left-5 rounded-full bg-brand px-2.5 py-0.5 text-xs font-medium text-brand-foreground">
          Лучший выбор
        </span>
      ) : null}
      <div className="flex items-center justify-between">
        <InsurerLogo short={insurer?.short ?? '—'} />
        <span className="text-xs text-muted-foreground">{product.period}</span>
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{insurer?.name}</p>

      <div className="mt-4 rounded-lg bg-secondary/60 px-3 py-2.5">
        <p className="text-xs text-muted-foreground">Страховая сумма</p>
        <p className="text-lg font-semibold tracking-tight text-foreground">
          {product.coverage}
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {product.benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-foreground"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-success" />
            {b}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {product.conditions}
      </p>

      <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Стоимость</p>
          <p className="text-xl font-semibold tracking-tight text-foreground">
            {product.price}
          </p>
        </div>
        <Button variant={featured ? 'default' : 'outline'}>Выбрать</Button>
      </div>
    </div>
  )
}
