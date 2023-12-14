import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Dedicado',
  description: 'Suporte e Desenvolvimento',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="mx-auto h-full w-full">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
