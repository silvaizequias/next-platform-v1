import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { ShowServicesSubscriptionBoxProps } from '../types'
import { SubscriptionType } from '@/views/subscriptions/types'
import { blue } from '@mui/material/colors'
import { Fragment, useState } from 'react'
import ShowInDialog from '@/components/ShowInDialog'
import ShowMyServiceSubscriptionDetail from './ShowMyServiceSubscriptionDetail'

export default function ShowServicesSubscriptionBox(
  props: ShowServicesSubscriptionBoxProps,
) {
  const { user } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleShowDetail = () => {
    setShowDialog(!showDialog)
  }

  const subscriptions = user?.subscriptions.filter(
    (subscriptions: SubscriptionType) => {
      return subscriptions
    },
  )

  return (
    <Fragment>
      {subscriptions?.map((subscription: SubscriptionType) => (
        <Grid key={subscription?.id} item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent
                sx={{
                  bgcolor: blue[400],
                }}
              >
                <Typography
                  variant='body1'
                  fontWeight={'500'}
                  textAlign={'center'}
                  textTransform={'uppercase'}
                  color={'white'}
                >
                  {subscription?.service?.name!}
                </Typography>
              </CardContent>
              <Divider
                sx={{ display: 'flex', justifyContent: 'center', pt: 2, mx: 2 }}
              >
                <Button
                  variant='contained'
                  size='small'
                  color='info'
                  onClick={handleShowDetail}
                >
                  Detalhes
                </Button>
              </Divider>
              <ShowInDialog
                open={showDialog}
                onClose={handleShowDetail}
                title={subscription?.service?.name!}
              >
                <ShowMyServiceSubscriptionDetail
                  onClose={handleShowDetail}
                  service={subscription?.service!}
                />
              </ShowInDialog>
              <CardContent>
                <CardContent sx={{ my: 0 }}>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    textAlign={'center'}
                  >
                    Ciclo{' '}
                    {subscription?.recurringInterval! == 'MONTH' && 'mensal'}{' '}
                    com a próxima renovação em{' '}
                    {new Date(
                      subscription?.currentPeriodEnd!,
                    ).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Fragment>
  )
}
