'use client'

import PageDisplay from '@/components/PageDisplay'
import ProfileView from './views/ProfileView'
import { memo } from 'react'
import { usePlatform } from '@/contexts/PlatformContext'
import PlatformMenu from '@/components/PlatformMenu'

const ProfilePage = () => {
  const { user }: any = usePlatform()

  return (
    <PageDisplay
      title={`olá ${user?.name.split(' ')[0] ?? ''}!`}
      subtitle="este é o seu espaço dedicado"
    >
      <div className="w-full">
        <PlatformMenu />
        <ProfileView />
      </div>
    </PageDisplay>
  )
}

export default memo(ProfilePage)
