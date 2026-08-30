import Link from 'next/link'
import { notFound } from 'next/navigation'
import { competitions } from '@/lib/data'
import { PageHeader } from '@/components/page-header'
import { CompetitionForm } from '@/components/competition-form'

export function generateStaticParams() {
  return competitions.map((c) => ({ slug: c.slug }))
}

export default async function EditCompetitionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const competition = competitions.find((c) => c.slug === slug)
  if (!competition) notFound()

  return (
    <div className="space-y-8">
      <Link
        href={`/federation/competitions/${competition.slug}`}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Назад к соревнованию
      </Link>
      <PageHeader
        eyebrow="Федерация"
        title="Редактирование соревнования"
        description="Обновите информацию и страховые требования соревнования."
      />
      <CompetitionForm competition={competition} />
    </div>
  )
}
