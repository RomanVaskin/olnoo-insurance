import { MessageSquare, Phone, Mail } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

const faq = [
  {
    q: 'Как понять, подходит ли мой полис под соревнование?',
    a: 'В разделе «Соревнования» откройте нужное событие — система автоматически сравнит требования организатора с вашими полисами и покажет статус.',
  },
  {
    q: 'Можно ли продлить полис?',
    a: 'Да, полисы со статусом «Истекает» можно продлить в один клик из раздела «Мои полисы».',
  },
  {
    q: 'Как получить бумажную копию полиса?',
    a: 'Все полисы доступны в формате PDF в разделе «Документы». Электронная версия имеет полную юридическую силу.',
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Аккаунт"
        title="Поддержка"
        description="Мы на связи ежедневно с 9:00 до 21:00 по московскому времени."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: MessageSquare, t: 'Чат', v: 'Ответ за 5 минут' },
          { icon: Phone, t: '8 800 000-00-00', v: 'Звонок бесплатный' },
          { icon: Mail, t: 'help@olnoo.ru', v: 'Ответ в течение дня' },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <span className="grid size-10 place-items-center rounded-lg bg-brand/10 text-brand">
              <c.icon className="size-5" />
            </span>
            <p className="mt-3 font-medium text-foreground">{c.t}</p>
            <p className="text-sm text-muted-foreground">{c.v}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Частые вопросы
        </h2>
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {faq.map((f) => (
            <div key={f.q} className="p-5">
              <h3 className="font-medium text-foreground">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-border bg-foreground p-6 text-background">
        <h3 className="font-semibold">Не нашли ответ?</h3>
        <p className="mt-1 text-sm text-background/70">
          Напишите нам, и мы поможем разобраться с любым вопросом.
        </p>
        <Button className="mt-4 bg-background text-foreground hover:bg-background/90">
          Написать в поддержку
        </Button>
      </div>
    </div>
  )
}
