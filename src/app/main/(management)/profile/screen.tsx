import ProfileAddressView from './views/profile-address-view'
import ProfileInformationView from './views/profile-information-view'
import ProfilePasswordView from './views/profile-password-view'

export default function ProfileScreen() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <h4 className="py-4 text-xl lowercase">meu perfil</h4>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          <div className="w-full">
            <ProfileInformationView />
          </div>
          <div className="w-full">
            <ProfileAddressView />
          </div>
          <div className="w-full">
            <ProfilePasswordView />
          </div>
        </div>
      </div>
    </div>
  )
}
