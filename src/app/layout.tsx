import { CrispChatProvider } from '@/components/CrispChat/provider'
import Spinner from '@/components/Spinner'
import ToastProvider from '@/components/ToastProvider'
import TopBar from '@/components/TopBar'
import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/types'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import Providers from './providers'
import { Analytics } from '@vercel/analytics/react'

export default async function AppLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  const onDevelopment = process.env.NODE_ENV === 'development'

  return (
    <Providers>
      <html lang='en' suppressHydrationWarning>
        {!onDevelopment && <CrispChatProvider />}
        <body>
          {session && <TopBar session={session} />}
          <Suspense fallback={<Spinner />}>{children}</Suspense>
          {!onDevelopment && <Analytics />}
          <ToastProvider />
        </body>
      </html>
    </Providers>
  )
}
