import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Box from '@/components/box'
import PageScreen from '@/components/page-screen'
import { OrganizationType } from './types'
import { actionGetOrganizations } from './actions'

export default async function OrganizationPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizations: OrganizationType[] = await actionGetOrganizations()

  return session ? (
    <PageScreen title="organziações da plataforma">
      <Box>
        <div className="w-full">...</div>
      </Box>
    </PageScreen>
  ) : (
    redirect('/')
  )
}
