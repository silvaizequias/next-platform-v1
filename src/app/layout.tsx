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
      <body className="min-h-screen bg-slate-200 text-zinc-600 dark:bg-slate-800 dark:text-zinc-200 text-base font-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
