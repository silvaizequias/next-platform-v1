import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return !session ? (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2"></div>
      {children}
    </div>
  ) : (
    redirect('/')
  )
}
