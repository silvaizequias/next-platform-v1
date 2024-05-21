'use client'

import { MemberType } from '@/types/organization'
import MemberDetailInListView from './MemberDetailInListView'
import { Suspense } from 'react'
import { useOrganization } from '@/contexts/OrganizationContext'

export default function MemberListView() {
  const { members }: MemberType[] | any = useOrganization()

  return members?.length > 0 ? (
    <div className="relative">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2"></div>
        <hr className="border-1 border-slate-400" />
        <Suspense>
          {
            <ul className="w-full">
              {members?.map((member: MemberType) => {
                return (
                  <div key={member?.id}>
                    <MemberDetailInListView member={member} />
                  </div>
                )
              })}
            </ul>
          }
        </Suspense>
      </div>
    </div>
  ) : (
    <div className="relative">
      <div className="py-4">
        <h4 className="text-center text-xl dark:text-white lowercase ">
          não existem memberos nesta organização
        </h4>
      </div>
    </div>
  )
}
