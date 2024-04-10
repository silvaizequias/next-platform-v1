import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { memo } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'meu perfil na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const ProfilePage = async () => {
  const session = await getServerSession(nextAuthOptions)
  const name: string = session?.user?.name!

  return (
    <PageDisplay
      title={`olá ${name.split(' ')[0] ?? ''}`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full"></div>
    </PageDisplay>
  )
}

export default memo(ProfilePage)
