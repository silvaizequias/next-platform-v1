import PageScreen from '@/components/page-screen'
import UserListView from './views/user-list-view'

export default function UserScreen() {
  
  return (
    <PageScreen title="gestão de usuários">
      <div className="w-full">
        <UserListView />
      </div>
    </PageScreen>
  )
}
