import { OrganizationType } from '../types'
import OrganizationOnlyView from './views/organization-only-view'
import UsersThisOrganziation from './views/users-this-organization'

interface Props {
  organization: OrganizationType
}

export default function OrganizationOnlyScreen(props: Props) {
  const { organization } = props

  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <h4 className="py-4 text-xl lowercase">{organization?.name}</h4>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="w-full sm:w-1/2">
              <OrganizationOnlyView organization={organization} />
            </div>
            <div className="w-full sm:w-1/2">serviços da organização</div>
          </div>
          <div className="w-full">
            <UsersThisOrganziation organization={organization} />
          </div>
        </div>
      </div>
    </div>
  )
}
