import { getOrganizationByDocument } from '@/actions/organizations/GET'
import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationUserType } from '@/types/organization-user.type'
import { OrganizationType } from '@/types/organization.type'
import { cnpjMask } from 'masks-br'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { MdGroupOff } from 'react-icons/md'
import OrganizationDetailView from './views/OrganizationDetailView'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params
  const organization: OrganizationType | any = await getOrganizationByDocument(
    document,
  )
  return {
    title: {
      default: `a melhor plataforma de serviços da ${organization?.name}`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function OrganizationsPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType | any = await getOrganizationByDocument(
    document,
  )

  const organizationUser =
    session &&
    organization?.users?.find(
      (users: OrganizationUserType) => users?.user?.id === session?.user?.id,
    )

  return session && session?.user.profile == 'master' ? (
    <PageDisplay
      title={organization?.name}
      subtitle={cnpjMask(organization?.document)}
    >
      <OrganizationDetailView data={organization} session={session!} />
    </PageDisplay>
  ) : organizationUser ? (
    <PageDisplay
      title={organization?.name}
      subtitle={cnpjMask(organization?.document)}
    >
      <OrganizationDetailView data={organization} session={session!} />
    </PageDisplay>
  ) : (
    <PageDisplay
      title={'acesso não autorizado'}
      subtitle={'nào há nada pra você por aqui'}
    >
      <div className="w-full flex flex-col justify-center items-center space-y-2">
        <span className="flex rounded-full p-2 text-amber-600 bg-amber-400/25">
          <MdGroupOff size={64} />
        </span>
        <h4 className="text-2xl text-center text-amber-600 font-semibold">
          você não é membro desta organização
        </h4>
      </div>
    </PageDisplay>
  )
}
