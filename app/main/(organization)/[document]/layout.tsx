import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationType } from '@/types/organization'
import { OrganizationUserType } from '@/types/organization-user'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode, Fragment } from 'react'
import { MdGroupOff } from 'react-icons/md'
import { actionGetOrganizationByDocument } from './actions'

export const metadata: Metadata = {
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
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
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document)

  const organizationUser =
    session &&
    organization?.users?.find(
      (users: OrganizationUserType) => users?.user?.id === session?.user?.id,
    )

  return session && organization ? (
    <Fragment>
      {session?.user.profile == 'master' ? (
        <div>{children}</div>
      ) : organizationUser ? (
        <div>{children}</div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <span className="flex rounded-full p-2 text-amber-600 bg-amber-400/25">
            <MdGroupOff size={64} />
          </span>
          <h4 className="text-2xl text-center text-amber-600 font-semibold">
            você não é membro desta organização
          </h4>
        </div>
      )}
    </Fragment>
  ) : (
    redirect('/')
  )
}
