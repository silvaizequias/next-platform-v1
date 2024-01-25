import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Box from '@/components/box'
import PageScreen from '@/components/page-screen'

export default async function OrganizationPage() {
  const session = await getServerSession(nextAuthOptions)

  return session ? (
    <PageScreen title="organziações do sistema">
      <Box>
        <div className="w-full">...</div>
      </Box>
    </PageScreen>
  ) : (
    redirect('/')
  )
}
