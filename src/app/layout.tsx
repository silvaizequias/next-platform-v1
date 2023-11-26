import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Providers from './providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import TopBar from '@/components/top-bar'

export const metadata: Metadata = {
  title: {
    default: 'Sistemas Personalizados de Alta Performance',
    template: `%s | Dedicado`,
  },
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar session={session!} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
