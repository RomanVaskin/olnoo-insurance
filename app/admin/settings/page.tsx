import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

const inputClass =
  'mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Настройки"
        title="Профиль страховой компании"
        description="Реквизиты и параметры интеграции с платформой OLNOO."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <form className="space-y-5 rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <label className="block">
            <span className="text-sm text-muted-foreground">Название компании</span>
            <input className={inputClass} defaultValue="АльфаСтрахование" />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-muted-foreground">ИНН</span>
              <input className={inputClass} defaultValue="7713056834" />
            </label>
            <label className="block">
              <span className="text-sm text-muted-foreground">Лицензия ЦБ</span>
              <input className={inputClass} defaultValue="СИ № 2239" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-muted-foreground">Email для заявок</span>
            <input className={inputClass} type="email" defaultValue="partners@alfastrah.ru" />
          </label>
          <div className="flex justify-end">
            <Button type="button">Сохранить изменения</Button>
          </div>
        </form>

        <div className="space-y-3 rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground">API-интеграция</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Подключите передачу полисов в OLNOO по API для автоматической
            проверки покрытия на соревнованиях.
          </p>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs break-all text-muted-foreground">
            olnoo_live_sk_••••••••••••4821
          </div>
          <Button variant="outline" className="w-full" type="button">
            Обновить ключ
          </Button>
        </div>
      </div>
    </div>
  )
}
