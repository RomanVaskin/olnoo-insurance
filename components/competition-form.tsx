'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import type { Competition } from '@/lib/data'
import { Button } from '@/components/ui/button'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

const inputClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none'

export function CompetitionForm({
  competition,
}: {
  competition?: Competition
}) {
  const [required, setRequired] = useState(
    competition?.requirements.required ?? true,
  )

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Основная информация
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Название соревнования">
              <input
                className={inputClass}
                defaultValue={competition?.name}
                placeholder="Например: Кубок России по дзюдо 2026"
              />
            </Field>
          </div>
          <Field label="Вид спорта">
            <select className={inputClass} defaultValue={competition?.sport ?? ''}>
              <option value="" disabled>
                Выберите вид спорта
              </option>
              {['Дзюдо', 'Футбол', 'Хоккей', 'Бег', 'Гимнастика', 'Велоспорт'].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ),
              )}
            </select>
          </Field>
          <Field label="Даты проведения">
            <input
              className={inputClass}
              defaultValue={competition?.dateLabel}
              placeholder="15–17 сентября 2026"
            />
          </Field>
          <Field label="Место проведения">
            <input
              className={inputClass}
              defaultValue={competition?.location}
              placeholder="Город, площадка"
            />
          </Field>
          <Field label="Организатор">
            <input
              className={inputClass}
              defaultValue={competition?.organizer}
              placeholder="Название федерации"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Описание">
              <textarea
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                defaultValue={competition?.description}
                placeholder="Краткое описание соревнования"
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-brand" />
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Страховые требования
          </h2>
        </div>

        <label className="mt-5 flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              Страховка обязательна для участия
            </p>
            <p className="text-sm text-muted-foreground">
              Участники без подходящего полиса не будут допущены.
            </p>
          </div>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="size-5 accent-[var(--brand)]"
          />
        </label>

        {required ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Минимальное покрытие">
              <select
                className={inputClass}
                defaultValue={competition?.requirements.minCoverage ?? '500 000 ₽'}
              >
                {['300 000 ₽', '500 000 ₽', '750 000 ₽', '1 000 000 ₽'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Обязательный риск">
              <select
                className={inputClass}
                defaultValue={competition?.requirements.risk ?? 'Несчастный случай'}
              >
                {['Несчастный случай', 'Травмы', 'Инвалидность'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Требуемый срок действия полиса">
                <input
                  className={inputClass}
                  defaultValue={competition?.requirements.period}
                  placeholder="14–18 сентября 2026"
                />
              </Field>
            </div>
          </div>
        ) : null}
      </section>

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          render={<Link href="/federation/competitions">Отмена</Link>}
        />
        <Button type="submit">
          {competition ? 'Сохранить изменения' : 'Создать соревнование'}
        </Button>
      </div>
    </form>
  )
}
