'use client'

import useFetch from '@/hooks/use-fetch'
import CreateOrganizationUserForm from '../views/forms/CreateOrganizationUserForm'
import { OrganizationType } from '@/types/platform-management/organization'
import { Session } from 'next-auth'
import OrganizationDetailView from './views/OrganizationDetailView'

interface Props {
  document: string
  session: Session
}

export default function OrganizationDetailScreen(props: Props) {
  const { document, session } = props
  const { data: organization } = useFetch<OrganizationType>(
    `/api/platform-management/organizations/document/${document}`,
  )
  console.log(organization)

  return organization ? (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-50 rounded-md p-4 shadow-md">
        <CreateOrganizationUserForm organizationId={organization?.id!} />
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <OrganizationDetailView organization={organization} />
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
      <h6 className="text-center text-lg sm:text-xl">
        A organização não existe!
      </h6>
    </div>
  )
}
