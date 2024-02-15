import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { UserType } from '../users/types'
import { actionGetProfile } from './actions'
import PageDisplay from '@/components/PageDisplay'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: {
    default: 'meu perfil na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const ProfileView = dynamic(() => import('./views/ProfileView'), {
  ssr: false,
})

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)
  const profile: UserType | any = await actionGetProfile(session!)

  return session ? (
    <PageDisplay
      title="meu perfil na plataforma"
      subtitle={`olá ${profile?.name.split(' ')[0]}`}
    >
      <ProfileView profile={profile} />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
