import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import AppBar from '@/components/appbar'
import Providers from './providers'
import Footer from '@/components/footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--font-roboto',
})

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  icons: { icon: '/logotipo5.png' },
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Sistemas Personalizados de Alta Performance',
    template: `%s | Dedicado`,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={`${roboto.variable} font-sans`}>
      <body className="min-h-screen bg-slate-200 text-zinc-600 dark:bg-slate-800 dark:text-zinc-200 text-base font-light">
        <Providers>
          <AppBar session={session!} />
          <main className="mx-auto h-full w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
