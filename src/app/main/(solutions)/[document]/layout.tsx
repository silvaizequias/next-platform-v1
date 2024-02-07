import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode, Fragment } from 'react'
import MyOrganizationSubscriptionsSpendingView from './creditos/views/MyOrganizationSubscriptionsSpendingView'
import { actionGetOrganizationApiSpend } from './actions'

export const metadata: Metadata = {
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationLayout({
  children,
  params,
}: {
  params: { document: string }
  children: ReactNode
}) {
  const { document } = params
  const session = await getServerSession(nextAuthOptions)
  const spending: number | any = await actionGetOrganizationApiSpend(document)

  return session ? (
    <Fragment>
      {children}
      {session && session?.user?.profile.includes('master' || 'member') ? (
        <MyOrganizationSubscriptionsSpendingView spending={spending} />
      ) : null}
    </Fragment>
  ) : (
    redirect('/')
  )
}
