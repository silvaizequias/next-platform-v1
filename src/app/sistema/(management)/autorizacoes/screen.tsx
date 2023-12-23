import AuthorizationListView from './views/AuthorizationListView'
import CreateAuthorizationForm from './views/forms/CreateAuthorizationForm'

export default function AuthorizationScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-50 rounded-md p-4 shadow-md">
        <CreateAuthorizationForm />
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">
          <AuthorizationListView />
        </div>
      </div>
    </div>
  )
}
