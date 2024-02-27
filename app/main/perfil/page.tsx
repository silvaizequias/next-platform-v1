import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { UserType } from '@/types/user'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetProfile } from './actions'
import ProfileView from './views/ProfileView'

export const metadata: Metadata = {
  title: {
    default: 'meu perfil na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)
  const profile: UserType | any = await actionGetProfile(session!)

  return (
    <PageDisplay
      title="meu perfil na plataforma"
      subtitle={`olá ${profile?.name.split(' ')[0]}`}
    >
      <div className="flex flex-col items-center md:flex-row">
        <div className="w-full">
          <ProfileView data={profile} />
        </div>
      </div>
    </PageDisplay>
  )
}
