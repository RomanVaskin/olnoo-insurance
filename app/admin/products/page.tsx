import { products } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { ProductManager } from '@/components/product-manager'

export default function AdminProductsPage() {
  const companyProducts = products.filter((p) => p.insurerId === 'alfa')

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Управление продуктами"
        title="Страховые продукты"
        description="Создавайте, редактируйте и снимайте с продажи страховые продукты. Изменения статуса влияют на витрину OLNOO."
      />
      <ProductManager initial={companyProducts} />
    </div>
  )
}
