'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from '@material-tailwind/react'
import { UserProps, UserType } from '../types'

export default function UserListView(props: UserProps) {
  const { data: users } = props

  const avatar = '/avatar.svg'

  return users ? (
    <List className="w-full">
      {users?.map((user: UserType) => (
        <ListItem key={user?.id} className="hover:shadow-sm">
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt={user?.name}
              src={user?.image || avatar}
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" className="uppercase">
              {user?.name}
            </Typography>
            <Typography variant="small" className="font-normal">
              {user?.phone}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  ) : null
}
