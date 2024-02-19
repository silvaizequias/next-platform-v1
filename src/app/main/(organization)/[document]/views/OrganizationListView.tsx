import { OrganizationUserType } from '@/types/organization-user.type'
import UpdateOrganizationView from './UpdateOrganizationView'
import { cnpjMask } from 'masks-br'
import CreateOrganizationView from './CreateOrganizationView'

interface Props {
  data: OrganizationUserType[] | any
}

export default function OrganizationListView(props: Props) {
  const { data } = props

  return (
    <div className="relative">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <CreateOrganizationView />
          <h6>criar nova organização</h6>
        </div>
        <hr className="border-1 border-slate-400" />
        <ul className="w-full">
          {data?.map((organization: OrganizationUserType) => {
            return (
              <li
                key={organization?.id}
                className="p-4 bg-slate-200 dark:bg-slate-800 dark:text-sky-600 rounded-md hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <a
                    href={organization?.organization?.document}
                    className="flex flex-col"
                  >
                    <h6 className="text-xl hover:opacity-50">
                      {organization?.organization?.name}
                    </h6>
                    <small className="text-xs font-thin opacity-60">
                      {cnpjMask(organization?.organization?.document)}
                    </small>
                  </a>
                  <div className="flex flex-1 justify-end space-x-2">
                    <UpdateOrganizationView data={organization?.organization} />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
