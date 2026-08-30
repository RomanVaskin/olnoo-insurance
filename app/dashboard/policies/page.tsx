import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { policies } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { PolicyCard } from '@/components/policy-card'
import { Button } from '@/components/ui/button'

export default function PoliciesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Мои полисы"
        title="Страховые полисы"
        description="Все ваши действующие и прошлые полисы в одном месте."
        actions={
          <Button
            render={
              <Link href="/insurance">
                Новый полис
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />

      <FilterBar
        searchPlaceholder="Поиск по номеру или типу…"
        filters={[
          { label: 'Статус', options: ['Активна', 'Истекает', 'Архив'] },
          { label: 'Направление', options: ['Спорт', 'Путешествия'] },
        ]}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {policies.map((p) => (
          <PolicyCard key={p.id} policy={p} />
        ))}
      </div>
    </div>
  )
}
