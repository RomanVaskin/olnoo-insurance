import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { competitions } from '@/lib/data'
import { CompetitionInsuranceFlow } from '@/components/competition-insurance-flow'

export function generateStaticParams() {
  return competitions.map((c) => ({ slug: c.slug }))
}

export default async function DashboardCompetitionFlowPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ application_id?: string }>
}) {
  const { slug } = await params
  const { application_id: applicationId } = await searchParams
  const competition = competitions.find((c) => c.slug === slug)
  if (!competition) notFound()

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/competitions"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← К соревнованиям
      </Link>
      <Suspense>
        <CompetitionInsuranceFlow
          competition={competition}
          applicationId={applicationId}
        />
      </Suspense>
    </div>
  )
}
