import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Box from '@/components/box'
import PageScreen from '@/components/page-screen'
import { actionGetProfile } from './actions'
import { UserType } from '../users/types'

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)
  const profile: UserType = await actionGetProfile(session!)

  return session ? (
    <PageScreen title="meu perfil">
      <Box>
        <div className="w-full">...</div>
      </Box>
    </PageScreen>
  ) : (
    redirect('/')
  )
}
