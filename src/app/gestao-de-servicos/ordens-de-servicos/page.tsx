import { authOptions } from '@/libraries/next-auth'
import ServiceOrderView from '@/views/service-managements/orders'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ServiceOrderPage() {
  const session = await getServerSession(authOptions)

  return session ? <ServiceOrderView session={session!} /> : redirect('/')
}
