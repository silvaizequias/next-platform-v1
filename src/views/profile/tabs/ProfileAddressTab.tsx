import { Box } from '@mui/material'
import { ProfileProps } from '../types'
import ProfileAddressUpdateForm from '../forms/ProfileAddressUpdateForm'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

export default function ProfileAddressTab(props: ProfileProps) {
  const { user } = props

  const ShowMapBox = dynamic(() => import('../mapbox'), {
    ssr: false,
  })

  return (
    <Box>
      <ProfileAddressUpdateForm user={user!} />
      <Suspense fallback={<Spinner />}>
        {user?.latitude && <ShowMapBox user={user!} />}
      </Suspense>
    </Box>
  )
}
