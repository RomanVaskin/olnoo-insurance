import { CategoryCard } from '@/components/category-card'
import { categories } from '@/lib/data'

export function CategoryGrid() {
  const featured = categories.find((c) => c.featured)!
  const rest = categories.filter((c) => !c.featured)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
          Страховые направления
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
          Платформа объединяет продукты разных страховых компаний. Сегодня
          основное направление — спорт, но каталог растёт в сторону путешествий,
          здоровья, авто, имущества и бизнеса.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard category={featured} featured />
        {rest.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </section>
  )
}
