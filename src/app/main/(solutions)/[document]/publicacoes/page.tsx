import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrganizationByDocument } from '../actions'
import { PublicationType } from '@/app/main/(management)/publications/types'
import { actionGetMyOrganizationPublications } from './actions'
import MyOrganizationPublicationsListView from './views/MyOrganizationPublicationsListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'publicações da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationPublicationsPage({
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
  const publications: PublicationType[] | any =
    await actionGetMyOrganizationPublications(
      organization?.authorizationKey?.authorizationKey,
      organization?.document,
    )

  return (
    <PageDisplay
      title={`publicações da organização ${organization?.name}`}
      subtitle="sua melhor plataforma de serviços"
    >
      <MyOrganizationPublicationsListView publications={publications} />
    </PageDisplay>
  )
}
