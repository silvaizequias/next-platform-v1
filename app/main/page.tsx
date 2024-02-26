import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationUserType } from '@/types/organization-user'
import { getServerSession } from 'next-auth'
import OrganizationListView from './(organization)/[document]/views/OrganizationListView'
import LandingPageView from './views/LandingPageView'
import { actionGetOrganizationUserByUserId } from './actions'
import Unauthorized from '@/components/Unauthorized'

export default async function MainPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizations: OrganizationUserType[] | any =
    await actionGetOrganizationUserByUserId()

  return session ? (
    <PageDisplay title="dedicado" subtitle="sua melhor plataforma de servços">
      {organizations && organizations?.statusCode != 401 ? (
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex flex-col w-full space-y-2">
            <OrganizationListView data={organizations} />
          </div>
          <div className="flex flex-col w-full space-y-2"></div>
        </div>
      ) : (
        <Unauthorized message={`${organizations?.message}`} />
      )}
    </PageDisplay>
  ) : (
    <LandingPageView />
  )
}
