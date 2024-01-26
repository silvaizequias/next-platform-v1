'use client'

import { Avatar } from '@material-tailwind/react'
import { UserProps } from '../../users/types'

export default function ProfileLeftView(props: UserProps) {
  const { data: profile } = props

  const avatar = profile?.image || '/avatar.svg'

  return profile ? (
    <div className="w-full flex flex-1 justify-center items-center">
      <Avatar
        className="cursor-pointer p-0.5"
        color="light-blue"
        withBorder={true}
        variant="rounded"
        size="xxl"
        src={avatar}
      />
    </div>
  ) : null
}
