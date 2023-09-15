import { authOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Configurações CFC:: Dedicado Digital',
}

export default async function SettingDrivingPage() {
  const session = await getServerSession(authOptions)

  return session ? '' : redirect('/')
}
