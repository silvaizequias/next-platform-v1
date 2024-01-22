import PageScreen from '@/components/page-screen'
import ProfileInformationView from './views/profile-information-view'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ProfileScreen(props: Props) {
  const { session } = props
  return (
    <PageScreen title="meu perfil">
      <div className="w-full">
        <ProfileInformationView session={session} />
      </div>
    </PageScreen>
  )
}
