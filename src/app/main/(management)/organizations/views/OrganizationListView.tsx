'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from '@material-tailwind/react'
import { OrganizationProps, OrganizationType } from '../types'

export default function OrganizationListView(props: OrganizationProps) {
  const { data: organizations } = props

  const logotipo = '/logotipo.svg'

  return organizations ? (
    <List className="w-full">
      {organizations?.map((organization: OrganizationType) => (
        <ListItem
          key={organization?.id}
          className="hover:shadow-sm"
        >
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt={organization?.name}
              src={organization?.image || logotipo}
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" className="uppercase">
              {organization?.name}
            </Typography>
            <Typography variant="small" className="font-normal">
              {organization?.document}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  ) : null
}
