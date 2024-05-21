import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo, Suspense } from 'react'
import LandingView from './views/LandingView'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import ManView from './views/MainView'
import PlatformMenu from '@/components/PlatformMenu'
import LandingPage from '@/components/LandingPage'

export const metadata: Metadata = {
  title: {
    default: 'você está na melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const MainPage = async () => {
  const session = await getServerSession(nextAuthOptions)

  return session ? (
    <PageDisplay
      title="este é o seu espaço dedicado"
      subtitle="a melhor plataforma de serviços"
    >
      <div className="w-full">
        <Suspense>
          <PlatformMenu />
          <ManView />
        </Suspense>
      </div>
    </PageDisplay>
  ) : (
    <LandingPage>
      <LandingView />
    </LandingPage>
  )
}

export default memo(MainPage)
