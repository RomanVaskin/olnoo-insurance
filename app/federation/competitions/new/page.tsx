import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { CompetitionForm } from '@/components/competition-form'

export default function NewCompetitionPage() {
  return (
    <div className="space-y-8">
      <Link
        href="/federation/competitions"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Все соревнования
      </Link>
      <PageHeader
        eyebrow="Федерация"
        title="Новое соревнование"
        description="Заполните информацию о соревновании и задайте страховые требования к участникам."
      />
      <CompetitionForm />
    </div>
  )
}
