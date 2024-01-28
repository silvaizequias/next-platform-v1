import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import AuthDialog from '@/components/auth-dialog'
import Box from '@/components/box'
import FullScreen from '@/components/full-screen'
import PageScreen from '@/components/page-screen'
import { OrganizationUsersType } from './(management)/organizations/types'
import MyOrganizationListView from './(management)/organizations/[document]/views/MyOrganizationListView'
import { actionGetMyOrganizations } from './(management)/organizations/[document]/actions'

export default async function MainPage() {
  const session = await getServerSession(nextAuthOptions)
  const myOrganizations: OrganizationUsersType[] =
    await actionGetMyOrganizations(session!)

  const logotipo = '/logotipo.svg'

  return session ? (
    <PageScreen title="plataforma dedicado">
      <Box>
        <div className="w-full">
          <h6 className="text-lg">organizações</h6>
          <MyOrganizationListView data={myOrganizations} />
        </div>
        <div className="w-full">
          <h6 className="text-lg">assinaturas</h6>
        </div>
      </Box>
    </PageScreen>
  ) : (
    <FullScreen>
      <Image
        className="my-4 w-[179px] h-[259px]"
        src={logotipo}
        alt={'Dedicado'}
        priority
        //loading={'lazy'}
        width={179}
        height={259}
      />
      <h1 className="text-6xl text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-semibold lowercase">
        dedicado
      </h1>
      <div className="mx-8">
        <div className="p-2">
          <h6 className="text-lg text-center py-4">
            sua melhor plataforma de serviços
          </h6>
        </div>
      </div>
      <AuthDialog />
    </FullScreen>
  )
}
