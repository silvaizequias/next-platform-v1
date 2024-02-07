import { Metadata } from 'next'
import { actionGetSlugPublication } from './actions'
import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import PageDisplay from '@/components/PageDisplay'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const { slug } = params
  const publication: any = await actionGetSlugPublication(slug)

  return {
    title: {
      default: publication,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function PublicationSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const publication: any = await actionGetSlugPublication(slug)

  return (
    <PageDisplay
      title={publication}
      subtitle="conteúdo inteligente do universo da tecnologia"
    >
      {publication}
    </PageDisplay>
  )
}
