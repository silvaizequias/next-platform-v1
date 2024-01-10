'use client'

import { UserType } from '../../users/types'

interface Props {
  profile: UserType
}

export default function ProfileLeftView(props: Props) {
  const { profile } = props

  return 'profile left view'
}
