import { authOptions } from '@/libraries/next-auth'
import MainView from '@/views/main'
import { getServerSession } from 'next-auth'

export default async function MainPage() {
  const session = await getServerSession(authOptions)
  return <MainView />
}
