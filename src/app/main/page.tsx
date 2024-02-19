import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import LandingPageView from './views/LandingPageView'
import PageDisplay from '@/components/PageDisplay'
import OrganizationListView from './(organization)/[document]/views/OrganizationListView'
import { getOrganizationUserByUserId } from '@/actions/organization-users/GET'
import { OrganizationUserType } from '@/types/organization-user.type'

export default async function MainPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizations: OrganizationUserType[] | any =
    await getOrganizationUserByUserId(session?.user?.id!)

  return session ? (
    <PageDisplay title="dedicado" subtitle="sua melhor plataforma de servços">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex flex-col w-full space-y-2">
          <OrganizationListView data={organizations} />
        </div>
        <div className="flex flex-col w-full space-y-2"></div>
      </div>
    </PageDisplay>
  ) : (
    <LandingPageView />
  )
}
