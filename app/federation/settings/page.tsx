import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

const inputClass =
  'mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none'

export default function FederationSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Федерация"
        title="Настройки"
        description="Данные организации и параметры уведомлений."
        actions={<Button>Сохранить</Button>}
      />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Организация
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {[
            { l: 'Название', v: 'Федерация дзюдо России' },
            { l: 'ИНН', v: '7700000000' },
            { l: 'Контактное лицо', v: 'Сергей Петров' },
            { l: 'Email', v: 'org@judo.ru' },
          ].map((f) => (
            <label key={f.l} className="block">
              <span className="text-sm text-muted-foreground">{f.l}</span>
              <input defaultValue={f.v} className={inputClass} />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Уведомления
        </h2>
        <div className="mt-4 space-y-3">
          {[
            'Уведомлять о спортсменах без страховки',
            'Уведомлять об истекающих полисах участников',
            'Еженедельный отчёт по покрытию',
          ].map((label, i) => (
            <label
              key={label}
              className="flex items-center justify-between rounded-xl border border-border p-4 text-sm text-foreground"
            >
              {label}
              <input
                type="checkbox"
                defaultChecked={i < 2}
                className="size-5 accent-[var(--brand)]"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}
