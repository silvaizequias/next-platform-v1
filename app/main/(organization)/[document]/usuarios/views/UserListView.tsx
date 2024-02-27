import { OrganizationUserType } from '@/types/organization-user'
import { celularMask } from 'masks-br'
import CreateUserView from './CreateUserView'
import UpdateUserView from './UpdateUserView'

interface Props {
  data: OrganizationUserType[] | any
}

export default function UserListView(props: Props) {
  const { data } = props
  const avatar = '/avatar.svg'

  return (
    <div className="relative">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <CreateUserView />
          <h6>adicionar usuário a esta organização</h6>
        </div>
        <hr className="border-1 border-slate-400" />
        <ul className="w-full">
          {data?.map((user: OrganizationUserType) => {
            return (
              <li
                key={user?.id}
                className={`my-2 p-4 bg-slate-200 ${
                  !user?.active && 'opacity-20'
                } dark:bg-slate-800 dark:text-sky-600 rounded-md hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <a className="flex flex-col">
                    <h6 className="text-xl hover:opacity-50 lowercase">
                      {user?.user?.name}
                    </h6>
                    <small className="text-xs font-thin opacity-60">
                      {celularMask(user?.user?.phone)}
                    </small>
                  </a>
                  <div className="flex flex-1 justify-end space-x-2">
                    <UpdateUserView data={user} />
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
