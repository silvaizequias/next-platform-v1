'use client'

import { OrderType } from '@/app/main/(management)/orders/types'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import CreateOrderFromMyOrganization from './CreateOrderFromMyOrganization'
import UpdateOrderFromMyOrganization from './UpdateOrderFromMyOrganization'

interface Props {
  orders: OrderType[] | any
  authorizationKey: string
}

export default function MyOrganziationOrdersListView(props: Props) {
  const { orders, authorizationKey } = props

  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <Card sx={{ width: '100%', maxWidth: 'md' }} component={'div'}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: 2,
        }}
      >
        <ButtonGroup size="small" variant="contained">
          <Button onClick={() => handleClick(`pedidos/itens`)}>itens</Button>
          <Button onClick={() => handleClick(`pedidos/evidencias`)}>
            evidências
          </Button>
        </ButtonGroup>
        <CreateOrderFromMyOrganization authorizationKey={authorizationKey} />
      </CardContent>
      <CardContent>
        <List dense sx={{ width: '100%' }}>
          {orders?.map((order: OrderType) => {
            return (
              <ListItem
                key={order?.id}
                secondaryAction={
                  <Stack>
                    <UpdateOrderFromMyOrganization
                      order={order}
                      authorizationKey={authorizationKey}
                    />
                  </Stack>
                }
                disablePadding
              >
                <ListItemButton sx={{ borderRadius: 1 }}>
                  <ListItemText
                    primary={
                      <Stack spacing={0.5} sx={{ display: 'flex' }}>
                        <Typography
                          variant="h6"
                          color="secondary"
                          sx={{ textTransform: 'lowercase' }}
                        >
                          {order?.code}
                        </Typography>
                        
                      </Stack>
                    }
                    secondary={
                      <Stack
                        gap={2}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Chip
                          label={order?.customer}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                        <Typography
                          variant="caption"
                          sx={{ textTransform: 'lowercase' }}
                        >
                          {order?.observation}
                        </Typography>
                      </Stack>
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
