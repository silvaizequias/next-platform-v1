import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
import { OrganizationType } from '@/types/organization'
import { OrganizationProvider } from '@/contexts/OrganizationContext'
import { organizationRepositoryFindByDocument } from '@/repositories/organization/GET'

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
      default: `a melhor plataforma de serviços da ${
        organization?.name || 'sua organização'
      }`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function OrganizationLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: { document: string }
}>) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params

  return session ? (
    <OrganizationProvider document={document} session={session!}>
      <Fragment>{children}</Fragment>
    </OrganizationProvider>
  ) : (
    redirect('/')
  )
}
