'use client'

import Container from '@/components/container'
import useFetch from '@/hooks/use-fetch'
import { Session } from 'next-auth'
import ProfileLeft from './profile-left'
import ProfileRight from './profile-right'

interface Props {
  session: Session
}

export default function ProfileView(props: Props) {
  const { session } = props
  const { data: user } = useFetch(`/api/users/${session?.user?.id}`)

  return (
    <Container>
      <div className="flex flex-col sm:flex-row">
        <ProfileLeft user={user} />
        <ProfileRight user={user} />
      </div>
    </Container>
  )
}
