import CreateOrganizationForm from './views/forms/CreateOrganizationForm'
import OrganizationListView from './views/OrganizationListView'

export default function OrganizationScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-50 rounded-md p-4 shadow-md">
        <CreateOrganizationForm />
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">
          <OrganizationListView />
        </div>
      </div>
    </div>
  )
}
