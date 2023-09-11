import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { SubscriptionType } from '@/views/control/subscriptions/types'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { Suspense } from 'react'

interface Props {
  id: string
}

export default function ShowSubscriptions({ id }: Props) {
  const { data: subscription } = useFetch<SubscriptionType>(
    `/api/subscriptions/${id}`,
  )
  return (
    <Suspense fallback={<Spinner />}>
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
            <Button variant='contained' size='small' color='info'>
              Detalhes
            </Button>
          </Divider>
          <CardContent>
            <CardContent sx={{ my: 0 }}>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign={'center'}
              >
                Ciclo {subscription?.recurringInterval! == 'MONTH' && 'mensal'}{' '}
                com a próxima renovação em{' '}
                {new Date(subscription?.currentPeriodEnd!).toLocaleDateString()}
              </Typography>
            </CardContent>
          </CardContent>
        </CardActionArea>
      </Card>
    </Suspense>
  )
}
