'use client'

import { UserType } from '../../users/types'

interface Props {
  profile: UserType
}

export default function ProfileRightView(props: Props) {
  const { profile } = props

  return 'profile right view'
}
