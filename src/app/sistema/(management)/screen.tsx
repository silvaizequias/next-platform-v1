'use client'

import useFetch from '@/hooks/use-fetch'
import {
  OrganizationType,
  OrganizationUserType,
} from '@/types/platform-management/organization'
import { UserType } from '@/types/platform-management/user'
import { Session } from 'next-auth'
import OrganizationCardView from './views/cards/OrganizationCardView'

interface Props {
  session: Session
}

export default function MainScreen(props: Props) {
  const { session } = props
  const { data: profile } = useFetch<UserType | any>('/api/profile')
  const { data: organizations } = useFetch<OrganizationType[] | any>(
    '/api/platform-management/organizations',
  )

  return (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
      <div className="flex flex-wrap gap-4">
        {session.user.profile !== 'MASTER'
          ? profile?.organizations?.map(
              (organization: OrganizationUserType) => (
                <div key={organization?.organization?.id}>
                  <OrganizationCardView
                    id={organization?.organization?.id}
                    role={organization?.role}
                  />
                </div>
              ),
            )
          : organizations?.map((organization: OrganizationType) => (
              <div key={organization?.id}>
                <OrganizationCardView id={organization?.id} />
              </div>
            ))}
      </div>
    </div>
  )
}
