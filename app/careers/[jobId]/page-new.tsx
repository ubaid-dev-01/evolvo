import { getJobById, jobRoles } from '@/lib/jobs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JobPageClient from './JobPageClient'

interface JobPageProps {
  params: {
    jobId: string
  }
}

// Generate static params for all job routes
export function generateStaticParams () {
  return jobRoles.map(job => ({
    jobId: job.id
  }))
}

// Generate metadata for SEO
export function generateMetadata ({ params }: JobPageProps): Metadata {
  const job = getJobById(params.jobId)

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

export default function JobPage ({ params }: JobPageProps) {
  const job = getJobById(params.jobId)

  if (!job) {
    notFound()
  }

  return <JobPageClient job={job} />
}
