'use client'

import useFetch from '@/hooks/use-fetch'
import { OrganizationType } from '@/types/platform-management/organization'

interface Props {
  id: string
  role?: string
}

export default function OrganizationCardView(props: Props) {
  const { id, role } = props
  const { data: organization } = useFetch<OrganizationType | any>(
    `/api/platform-management/organizations/${id}`,
  )

  return (
    <div className="rounded-md shadow-md w-full sm:w-[280px] md:w-[340px] lg:w-[400px]">
      <div className="min-w-[220px] cursor-pointer">
        <div className="w-auto flex flex-col gap-2">
          <div className="flex justify-end">
            <span
              className={`py-1 px-2 rounded-tr-md text-right text-xs ${
                organization?.isActive ? 'bg-green-200' : 'bg-red-200'
              } uppercase`}
            >
              {organization?.isActive ? 'ativa' : 'inativa'}
            </span>
          </div>
          <div className="flex flex-col p-4">
            <h4 className="text-lg sm:text-xl text-blue-400 font-medium uppercase">
              {organization?.name}
            </h4>
            <span className="text-xs text-slate-400 lowercase">
              {organization?.documentCode}
            </span>
            {role && (
              <span className="text-xs text-slate-400 lowercase">{role}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
