import { authOptions } from '@/libraries/next-auth'
import SupportView from '@/views/support'
import { getServerSession } from 'next-auth'

export default async function SupportPage() {
  const session = await getServerSession(authOptions)

  return <SupportView />
}
