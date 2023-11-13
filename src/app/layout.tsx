import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/toast-provider'
import AppBar from '@/components/appbar'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--font-roboto',
})

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Suporte Técnico Especializado',
    template: `%s | Dedicado`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} font-sans`}>
      <body className=" bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-base font-light">
        <AppBar />
        <main className="flex min-h-screen">{children}</main>
        <ToastProvider />
      </body>
    </html>
  )
}
