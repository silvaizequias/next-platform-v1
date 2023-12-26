'use client'

import useFetch from '@/hooks/use-fetch'
import { OrganizationType } from '@/types/platform-management/organization'
import { MdEditSquare } from 'react-icons/md'

export default function OrganizationListView() {
  const { data: organizations } = useFetch<OrganizationType[] | any>(
    '/api/platform-management/organizations',
  )

  const TABLE_HEAD = ['documento', 'nome', 'email', 'phone', 'status', '']

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
          {organizations?.map((organization: OrganizationType) => {
            const classes = 'p-4 border-b border-blue-gray-200'

            return (
              <tr key={organization?.id}>
                <td className={classes}>{organization?.documentCode}</td>
                <td className={classes}>{organization?.name}</td>
                <td className={classes}>{organization?.email}</td>
                <td className={classes}>{organization?.phone}</td>
                <td className={classes}>
                  {organization?.isActive ? 'ativa' : 'suspensa'}
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
