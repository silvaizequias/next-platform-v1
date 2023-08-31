import Spinner from '@/components/Spinner'
import ThemeRegistry from '@/components/ThemeRegistry'
import TopBar from '@/components/TopBar'
import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/types'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

export default async function AppLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          {session && <TopBar session={session} />}
          <Suspense fallback={<Spinner />}>{children}</Suspense>
          <Toaster
            position={'top-center'}
            toastOptions={{ className: 'react-hot-toast' }}
          />
        </ThemeRegistry>
      </body>
    </html>
  )
}
