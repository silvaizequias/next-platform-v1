import { authOptions } from '@/libraries/next-auth'
import MainView from '@/views'
import { getServerSession } from 'next-auth'

export default async function MainPage() {
  const session = await getServerSession(authOptions)
  return <MainView session={session!} />
}
