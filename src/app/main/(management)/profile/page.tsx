import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Box from '@/components/box'
import PageScreen from '@/components/page-screen'
import { actionGetProfile } from './actions'
import { UserType } from '../users/types'
import ProfileLeftView from './views/ProfileLeftView'
import ProfileRightView from './views/ProfileRightView'

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)
  const profile: UserType = await actionGetProfile(session!)

  return session ? (
    <PageScreen title={`olá ${profile?.name.split(' ')[0]}`}>
      <Box>
        <div className="w-full sm:w-1/5">
          <ProfileLeftView data={profile} />
        </div>
        <div className="w-full sm:w-4/5">
          <ProfileRightView data={profile} />
        </div>
      </Box>
    </PageScreen>
  ) : (
    redirect('/')
  )
}
