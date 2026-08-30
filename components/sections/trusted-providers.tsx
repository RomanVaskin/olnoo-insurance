import { insurers } from '@/lib/data'
import { InsurerLogo } from '@/components/brand'

export function TrustedProviders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-muted-foreground">
        Работаем с ведущими страховыми компаниями
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {insurers.map((ins) => (
          <InsurerLogo key={ins.id} short={ins.short} name={ins.name} />
        ))}
      </div>
    </section>
  )
}
