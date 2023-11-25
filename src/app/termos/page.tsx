import { authOptions } from '@/libraries/next-auth'
import TermView from '@/views/terms'
import { getServerSession } from 'next-auth'

export default async function TermPage() {
  const session = await getServerSession(authOptions)

  return <TermView />
}
