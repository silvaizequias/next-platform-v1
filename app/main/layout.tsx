import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { nextAuthOptions } from '@/libraries/next-auth'
import { UserType } from '@/types/user'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { ReactNode, Fragment } from 'react'
import { actionGetProfile } from './perfil/actions'

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
  const profile: UserType | any = await actionGetProfile(session!)

  return (
    <Fragment>
      <Topbar profile={profile} session={session!} />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}
