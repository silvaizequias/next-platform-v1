import LoginPage from '@/components/LoginPage'
import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { memo } from 'react'

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
      title={`controle dedicado`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full"></div>
    </PageDisplay>
  ) : (
    <LoginPage />
  )
}

export default memo(MainPage)
