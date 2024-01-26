import Box from '@/components/box'
import PageScreen from '@/components/page-screen'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { OrganizationKeyType } from './types'
import { actionGetOrganizationKeys } from './actions'

export default async function AuthorizationPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizationKeys: OrganizationKeyType[] =
    await actionGetOrganizationKeys(session!)

  return session ? (
    <PageScreen title="autorizações de acesso da plataforma">
      <Box>
        <div className="w-full">...</div>
      </Box>
    </PageScreen>
  ) : (
    redirect('/')
  )
}
