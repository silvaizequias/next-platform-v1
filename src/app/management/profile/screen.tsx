'use client'

import { UserType } from "../users/types"

interface Props {
  profile: UserType
}

export default function ProfileScreen(props: Props) {
  const {profile} = props

  return 'profile screen'
}
