'use client'

import PageDisplay from '@/components/PageDisplay'
import { Suspense } from 'react'
import OrganizationMenu from '../components/OrganizationMenu'
import MemberListView from './views/MemberListView'
import { useOrganization } from '@/contexts/OrganizationContext'

const MemberPage = () => {
  const { organization, members }: any = useOrganization()

  return (
    <PageDisplay
      title={`membros da organização ${organization?.name ?? ''}`}
      subtitle={'a melhor plataforma de serviços'}
    >
      {members ? (
        <Suspense>
          <OrganizationMenu />
          <MemberListView />
        </Suspense>
      ) : null}
    </PageDisplay>
  )
}
export default MemberPage
