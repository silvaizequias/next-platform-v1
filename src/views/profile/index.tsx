'use client'

import Container from '@/components/container'
import useFetch from '@/hooks/use-fetch'
import { Session } from 'next-auth'
import ProfileLeft from './profile-left'
import ProfileRight from './profile-right'
import { Suspense } from 'react'
import Loading from '@/app/loading'

interface Props {
  session: Session
}

export default function ProfileView(props: Props) {
  const { session } = props
  const { data: user } = useFetch(`/api/users/${session?.user?.id}`)

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <div className="sm:max-w-sm">
            <ProfileLeft user={user} />
          </div>
          <div className="flex flex-1 rounded-md bg-slate-100 dark:text-zinc-600">
            <ProfileRight user={user} />
          </div>
        </div>
      </Container>
    </Suspense>
  )
}
