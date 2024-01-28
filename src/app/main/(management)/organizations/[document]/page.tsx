import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import actionGetOrganizationByDocument from './actions'
import { OrganizationType } from '../types'
import { redirect } from 'next/navigation'
import PageScreen from '@/components/page-screen'
import Box from '@/components/box'
import MyOrganizationUserListView from './views/MyOrganizationUserListView'
import MyOrganizationDetailView from './views/MyOrganizationDetailView'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document)
  return organization
    ? { title: `detalhes da organização ${organization?.name}` }
    : null
}

export default async function OrganizationOnlyPage({
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

  return session
    ? organization && (
        <PageScreen title={organization?.name}>
          <Box>
            <div className="w-full">
              <MyOrganizationDetailView data={organization} />
            </div>
            <div className="w-full">
              <div className="flex flex-auto justify-between items-center gap-2 shadow-md rounded-md bg-opacity-50 p-2">
                <h6 className="text-lg">soluções da {organization?.name}</h6>
              </div>
              ...
            </div>
          </Box>
          <div className="py-4">
            <MyOrganizationUserListView data={organization?.users} />
          </div>
        </PageScreen>
      )
    : redirect('/')
}
