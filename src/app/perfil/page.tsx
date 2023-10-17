import ProfileView from '@/views/profile'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Perfil',
}

export default function ProfilePage() {
  return (
    <Fragment>
      <ProfileView />
    </Fragment>
  )
}
