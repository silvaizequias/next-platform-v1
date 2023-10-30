import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Providers from './providers'
import { Analytics } from '@vercel/analytics/react'
const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    siteName: 'Dedicado Digital',
    type: 'website',
    title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          {!isDevelopment && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
