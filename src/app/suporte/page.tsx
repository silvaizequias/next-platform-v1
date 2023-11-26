import { authOptions } from '@/libraries/next-auth'
import SupportView from '@/views/support'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SupportPage() {
  const session = await getServerSession(authOptions)

  return !session ? <SupportView /> : redirect('/servicos')
}
