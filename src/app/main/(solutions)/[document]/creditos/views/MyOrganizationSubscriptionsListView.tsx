'use client'

import { SubscriptionType } from '@/app/main/(management)/subscriptions/types'
import { Add } from '@mui/icons-material'
import {
  List,
  ListItem,
  Chip,
  ListItemButton,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Fab,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  colors,
} from '@mui/material'
import { Fragment, useCallback, useState } from 'react'

interface Props {
  subscriptions: SubscriptionType[] | any
}

export default function MyOrganizationSubscriptionsListView(props: Props) {
  const { subscriptions } = props

  const [createSubscription, setCreateSubscription] = useState<boolean>(false)
  const handleCreateSubscription = useCallback(() => {
    setCreateSubscription(!createSubscription)
  }, [createSubscription])

  return (
    <Fragment>
      <Card sx={{ width: '100%', maxWidth: 'md' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
          <Tooltip title={'adicionar'} onClick={handleCreateSubscription}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
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
      <Dialog
        open={createSubscription}
        keepMounted
        onClose={handleCreateSubscription}
        maxWidth={'xs'}
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: colors.blue[400],
            textTransform: 'lowercase',
          }}
        >
          {'dedicado'}
        </DialogTitle>
        <DialogContent>...</DialogContent>
      </Dialog>
    </Fragment>
  )
}
