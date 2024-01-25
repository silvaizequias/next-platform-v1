'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from '@material-tailwind/react'
import { MyOrganizationProps, OrganizationUsersType } from '../types'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function MyOrganizationListView(props: MyOrganizationProps) {
  const { data } = props

  const logotipo = '/logotipo.svg'

  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return data ? (
    <List className="w-full">
      {data?.map((myOrganization: OrganizationUsersType) => (
        <ListItem
          key={myOrganization?.id}
          className="hover:shadow-sm"
          onClick={() =>
            handleClick(`organizations/${myOrganization?.organization?.document}`)
          }
        >
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt={myOrganization?.organization?.name}
              src={myOrganization?.organization?.image || logotipo}
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" className="uppercase">
              {myOrganization?.organization?.name}
            </Typography>
            <Typography variant="small" className="font-normal">
              {myOrganization?.role}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  ) : null
}
