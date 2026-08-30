import type { Metadata } from 'next'
import { competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { EventCard } from '@/components/event-card'

export const metadata: Metadata = {
  title: 'Соревнования — OLNOO',
  description:
    'Календарь спортивных соревнований со страховыми требованиями к участникам.',
}

export default function CompetitionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Календарь"
        title="Соревнования"
        description="Найдите соревнование, проверьте страховые требования и оформите подходящий полис за пару минут."
      />

      <div className="mt-8">
        <FilterBar
          searchPlaceholder="Поиск соревнований…"
          filters={[
            { label: 'Вид спорта', options: ['Дзюдо', 'Бег', 'Хоккей', 'Футбол'] },
            { label: 'Город', options: ['Москва', 'Санкт-Петербург'] },
            { label: 'Месяц', options: ['Сентябрь', 'Октябрь', 'Ноябрь'] },
          ]}
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((c) => (
          <EventCard key={c.slug} competition={c} />
        ))}
      </div>
    </div>
  )
}
