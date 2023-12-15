import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  
  return session ? <div>{children}</div> : redirect('/auth')
}
