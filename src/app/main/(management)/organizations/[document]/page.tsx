import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import actionGetOrganizationByParams from './actions'
import { OrganizationType } from '../types'
import OrganizationOnlyScreen from './screen'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByParams(document)
  return organization
    ? { title: `Detalhes da Organização ${organization?.name}` }
    : null
}

export default async function OrganizationOnlyPage({
  params,
}: {
  params: { document: string }
}) {
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByParams(document)
  const session = await getServerSession(nextAuthOptions)

  return organization && <OrganizationOnlyScreen organization={organization} />
}
