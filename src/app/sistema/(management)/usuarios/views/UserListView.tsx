'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'
import { Avatar } from '@material-tailwind/react'
import { MdEditSquare } from 'react-icons/md'

export default function UserListView() {
  const { data: users } = useFetch<UserType[] | any>(
    '/api/platform-management/users',
  )

  const avatar = '/avatar.svg'

  const TABLE_HEAD = ['', 'nome', 'email', 'perfil', 'status', '']

  return (
    <div className="relative">
      <table className="w-full table-auto text-left lowercase">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: any) => (
              <th
                key={head}
                className="p-4 border-b border-blue-gray-100 bg-blue-gray-200"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user: UserType) => {
            const classes = 'p-4 border-b border-blue-gray-200'

            return (
              <tr key={user?.id}>
                <td className={classes}>
                  <div className="relative">
                    <Avatar size="sm" src={user?.image || avatar} />
                  </div>
                </td>
                <td className={classes}>{user?.name}</td>
                <td className={classes}>{user?.email}</td>
                <td className={classes}>{user?.profile}</td>
                <td className={classes}>
                  {user?.isActive ? 'ativo' : 'suspenso'}
                </td>
                <td className={classes}>
                  <div className="text-green-400 opacity-50 hover:opacity-100 cursor-pointer">
                    <MdEditSquare />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
