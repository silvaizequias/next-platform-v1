import PageScreen from '@/components/page-screen'
import ProfileAddressView from './views/profile-address-view'
import ProfileInformationView from './views/profile-information-view'
import ProfilePasswordView from './views/profile-password-view'

export default function ProfileScreen() {
  return (
    <PageScreen title="meu perfil">
      <div className="w-full">
        <ProfileInformationView />
      </div>
      <div className="w-full">
        <ProfileAddressView />
      </div>
      <div className="w-full">
        <ProfilePasswordView />
      </div>
    </PageScreen>
  )
}
