'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from '@material-tailwind/react'
import { OrganizationProps, OrganizationUsersType } from '../../types'

export default function MyOrganizationUserListView(props: OrganizationProps) {
  const { data } = props
  const avatar = '/avatar.svg'

  return data ? (
    <List className="w-full">
      {data?.users?.map((organizationUser: OrganizationUsersType) => (
        <ListItem key={organizationUser?.id} className="hover:shadow-sm">
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt={organizationUser?.user?.name}
              src={organizationUser?.user?.image || avatar}
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6">
              {organizationUser?.user?.name}
            </Typography>
            <Typography variant="small" className="font-normal">
              {organizationUser?.role}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  ) : null
}
