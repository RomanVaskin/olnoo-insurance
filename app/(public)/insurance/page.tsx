import type { Metadata } from 'next'
import { categories, products, categoryBySlug } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { CategoryCard } from '@/components/category-card'
import { InsuranceProductCard } from '@/components/insurance-product-card'

export const metadata: Metadata = {
  title: 'Каталог страховых продуктов — OLNOO',
  description:
    'Сравнивайте страховые продукты от проверенных страховых компаний по всем направлениям.',
}

export default function InsuranceCatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Каталог"
        title="Страховые продукты"
        description="Выбирайте направление, сравнивайте предложения от разных страховых компаний и оформляйте полис онлайн."
      />

      <div className="mt-8">
        <FilterBar
          searchPlaceholder="Поиск по продуктам и компаниям…"
          filters={[
            { label: 'Направление', options: categories.map((c) => c.name) },
            {
              label: 'Страховая',
              options: ['АльфаСтрахование', 'СОГАЗ', 'Ингосстрах', 'РЕСО-Гарантия', 'ВСК'],
            },
            { label: 'Срок', options: ['На турнир', 'На 30 дней', 'На год'] },
          ]}
        />
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Направления
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-brand uppercase">
              {categoryBySlug('sport')?.name}
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              Популярные продукты для спорта
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.category === 'sport')
            .map((p) => (
              <InsuranceProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Другие направления
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.category !== 'sport')
            .map((p) => (
              <InsuranceProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </div>
  )
}
