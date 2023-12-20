import UserListView from './views/UserListView'
import CreateUserForm from './views/forms/CreateUserForm'

export default function UserScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-50 rounded-md p-4 shadow-md">
        <CreateUserForm />
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">
          <UserListView />
        </div>
      </div>
    </div>
  )
}
