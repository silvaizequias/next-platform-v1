import ProfileScreen from './screen'

export default async function ProfilePage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <ProfileScreen />
        </div>
      </div>
    </div>
  )
}
