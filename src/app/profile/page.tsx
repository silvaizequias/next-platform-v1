import ProfilePage from '@/pages/profile/ProfilePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perfil :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Profile() {
  return <ProfilePage />
}
