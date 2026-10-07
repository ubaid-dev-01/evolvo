import { getJobById, jobRoles } from '@/lib/jobs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JobPageClient from './JobPageClient'

interface JobPageProps {
  params: Promise<{
    jobId: string
  }>
}

// Generate static params for all job routes
export function generateStaticParams () {
  return jobRoles.map(job => ({
    jobId: job.id
  }))
}

// Generate metadata for SEO
export async function generateMetadata ({
  params
}: JobPageProps): Promise<Metadata> {
  const { jobId } = await params
  const job = getJobById(jobId)

  if (!job) {
    return {
      title: 'Job Not Found'
    }
  }

  return {
    title: `${job.title} - Evolvo Careers`,
    description: job.longDesc || job.description,
    openGraph: {
      title: `${job.title} - Evolvo Careers`,
      description: job.longDesc || job.description,
      type: 'website'
    }
  }
}

export default async function JobPage ({ params }: JobPageProps) {
  const { jobId } = await params
  const job = getJobById(jobId)

  if (!job) {
    notFound()
  }

  // Pass only serializable data to client component
  const serializedJob = {
    id: job.id,
    title: job.title,
    description: job.description,
    formUrl: job.formUrl,
    longDesc: job.longDesc,
    color: job.color
  }

  return <JobPageClient job={serializedJob} />
}
