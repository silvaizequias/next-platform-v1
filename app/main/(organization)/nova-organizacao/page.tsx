'use client'

import PageDisplay from '@/components/PageDisplay'
import { memo } from 'react'
import { redirect } from 'next/navigation'
import { usePlatform } from '@/contexts/PlatformContext'
import { UserType } from '@/types/user'
import CreateNewOrganizationView from './views/CreateNewOrganizationView'
import CompleteProfileInformationView from './views/CompleteProfileInformationView'
import PlatformMenu from '@/components/PlatformMenu'

const OrganizationCreatePage = () => {
  const { user }: UserType | any = usePlatform()

  return user ? (
    <PageDisplay
      title={`criar nova organização`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full">
        <PlatformMenu />
        <h2 className="pt-4 text-4xl text-center font-semibold lowercase dark:text-slate-200">
          olá {user?.name}
        </h2>
        {user && user?.document ? (
          <CreateNewOrganizationView />
        ) : (
          <CompleteProfileInformationView />
        )}
      </div>
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
export default memo(OrganizationCreatePage)
