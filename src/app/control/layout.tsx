import Spinner from '@/components/Spinner'
import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function ControlLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  return session && session?.user?.profile == 'MASTER' ? (
    <Suspense fallback={<Spinner />}>{children}</Suspense>
  ) : (
    redirect('/')
  )
}
