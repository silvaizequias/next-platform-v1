import { Metadata } from 'next'
import {
  actionGetOrganizationApiSpend,
  actionGetOrganizationByDocument,
} from './actions'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationType } from '../../(management)/organizations/types'
import OrganizationDetailView from './views/OrganizationDetailView'
import PageDisplay from '@/components/PageDisplay'
import { Typography } from '@mui/material'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType = await actionGetOrganizationByDocument(
    document,
    session!,
  )

  return {
    title: {
      default: `a melhor plataforma de serviços da ${organization?.name}`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function MyOrganizationsPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType = await actionGetOrganizationByDocument(
    document,
    session!,
  )

  return (
    <PageDisplay title={organization?.name} subtitle={organization?.document}>
      <OrganizationDetailView organization={organization} />
    </PageDisplay>
  )
}
