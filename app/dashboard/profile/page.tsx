import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

const fields = [
  { l: 'Фамилия и имя', v: 'Алексей Иванов' },
  { l: 'Дата рождения', v: '12.04.2002' },
  { l: 'Email', v: 'a.ivanov@example.ru' },
  { l: 'Телефон', v: '+7 900 000-00-00' },
  { l: 'Спортивный клуб', v: 'СК «Самбо-70»' },
  { l: 'Вид спорта', v: 'Дзюдо' },
  { l: 'Разряд', v: 'КМС' },
  { l: 'Город', v: 'Москва' },
]

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Аккаунт"
        title="Профиль спортсмена"
        description="Эти данные автоматически подставляются при оформлении полисов."
        actions={<Button>Сохранить изменения</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
            АИ
          </span>
          <h2 className="mt-4 font-semibold text-foreground">Алексей Иванов</h2>
          <p className="text-sm text-muted-foreground">Спортсмен · Дзюдо</p>
          <Button variant="outline" className="mt-4 w-full">
            Загрузить фото
          </Button>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.l} className="block">
                <span className="text-sm text-muted-foreground">{f.l}</span>
                <input
                  defaultValue={f.v}
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
