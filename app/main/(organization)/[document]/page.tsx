import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationType } from '@/types/organization'
import { cnpjMask } from 'masks-br'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import OrganizationDetailView from './views/OrganizationDetailView'
import { actionGetOrganizationByDocument } from './actions'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document)
  return {
    title: {
      default: `a melhor plataforma de serviços da ${organization?.name}`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function OrganizationsPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document)

  return (
    <PageDisplay
      title={organization?.name}
      subtitle={cnpjMask(organization?.document)}
    >
      <OrganizationDetailView data={organization} session={session!} />
    </PageDisplay>
  )
}
