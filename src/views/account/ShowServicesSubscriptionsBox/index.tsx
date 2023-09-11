import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { SubscriptionType } from '@/views/control/subscriptions/types'
import { blue } from '@mui/material/colors'
import { useState } from 'react'
import ShowInDialog from '@/components/ShowInDialog'
import ShowMyServiceSubscriptionDetail from './ShowMyServiceSubscriptionDetail'
import { useFetch } from '@/hooks/useFetch'

interface Props {
  id: string
}

export default function ShowServicesSubscriptionBox({ id }: Props) {
  const { data: subscription } = useFetch<SubscriptionType>(
    `/api/subscriptions/${id}`,
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleShowDetail = () => {
    setShowDialog(!showDialog)
  }

  return (
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
          <ShowMyServiceSubscriptionDetail id={subscription?.service?.id!} />
        </ShowInDialog>
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
  )
}
