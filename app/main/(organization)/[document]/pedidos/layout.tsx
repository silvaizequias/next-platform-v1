import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
import { OrganizationType } from '@/types/organization'
import { organizationRepositoryFindByDocument } from '@/repositories/organization/GET'
import { OrderProvider } from '@/contexts/OrderContext'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params
  const organization: OrganizationType =
    await organizationRepositoryFindByDocument(document)

  return {
    title: {
      default: `gestão de pedidos da ${
        organization?.name || 'sua organização'
      }`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function OrderLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: { document: string }
}>) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params

  return session ? (
    <OrderProvider document={document} session={session!}>
      <Fragment>{children}</Fragment>
    </OrderProvider>
  ) : (
    redirect('/')
  )
}
