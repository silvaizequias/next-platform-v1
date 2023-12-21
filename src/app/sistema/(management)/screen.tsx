'use client'

import useFetch from '@/hooks/use-fetch'
import { OrganizationUserType } from '@/types/platform-management/organization'
import { UserType } from '@/types/platform-management/user'
import { Session } from 'next-auth'
import OrganizationCardView from './organizacoes/views/cards/OrganizationCardView'

interface Props {
  session: Session
}

export default function MainScreen(props: Props) {
  const { session } = props
  const { data: profile } = useFetch<UserType | any>('/api/profile')

  return (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
      <div className="flex flex-wrap gap-4">
        {profile?.organizations ? (
          profile?.organizations?.map((organization: OrganizationUserType) => (
            <div key={organization?.organization?.id}>
              <OrganizationCardView
                id={organization?.organization?.id}
                role={organization?.role}
              />
            </div>
          ))
        ) : (
          <h6 className="text-lg sm:text-xl text-center lowercase">
            Sem organizações para exibir!
          </h6>
        )}
      </div>
    </div>
  )
}
