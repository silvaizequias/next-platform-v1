import { CrispChatProvider } from '@/components/CrispChat/provider'
import Spinner from '@/components/Spinner'
import ToastProvider from '@/components/ToastProvider'
import TopBar from '@/components/TopBar'
import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/types'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import Providers from './providers'

export default async function AppLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  return (
    <Providers>
      <html lang='en' suppressHydrationWarning>
        <CrispChatProvider />
        <body>
          {session && <TopBar session={session} />}
          <Suspense fallback={<Spinner />}>{children}</Suspense>
          <ToastProvider />
        </body>
      </html>
    </Providers>
  )
}
