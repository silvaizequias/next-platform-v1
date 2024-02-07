'use client'

import { OrganizationUsersType } from '@/app/main/(management)/organizations/users/types'
import { SubscriptionType } from '@/app/main/(management)/subscriptions/types'
import DialogButton from '@/components/DialogButton'
import {
  List,
  ListItem,
  Chip,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Card,
  CardContent,
} from '@mui/material'

interface Props {
  subscriptions: SubscriptionType[] | any
}

export default function MyOrganizationSubscriptionsListView(props: Props) {
  const { subscriptions } = props

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
        <DialogButton>...</DialogButton>
      </CardContent>
      <CardContent>
        <List dense sx={{ width: '100%' }}>
          {subscriptions?.map((subscription: SubscriptionType) => {
            return (
              <ListItem
                key={subscription?.id}
                secondaryAction={
                  <Chip
                    label={`R$ ${subscription?.price}`}
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ textTransform: 'lowercase' }}
                      >
                        {`${subscription?.spendLimit} adquiridos`}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption">
                        {`${subscription?.spending} utilizados`}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}
