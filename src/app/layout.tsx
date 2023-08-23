import Spinner from '@/components/Spinner'
import ThemeRegistry from '@/components/ThemeRegistry'
import AppLayout from '@/layouts'
import { LayoutProps } from '@/types'
import { Suspense } from 'react'

export default function RootLayout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <AppLayout>
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </AppLayout>
        </ThemeRegistry>
      </body>
    </html>
  )
}
