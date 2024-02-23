import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { ReactNode, Fragment } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)

  return (
    <Fragment>
      <Topbar session={session!} />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}
