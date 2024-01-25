import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Box from '@/components/box'
import PageScreen from '@/components/page-screen'
import { actionGetUsers } from './actions'
import { UserType } from './types'

export default async function UserPage() {
  const session = await getServerSession(nextAuthOptions)
  const users: UserType[] = await actionGetUsers()

  return session ? (
    <PageScreen title="usuários da plataforma">
      <Box>
        <div className="w-full">...</div>
      </Box>
    </PageScreen>
  ) : (
    redirect('/')
  )
}
