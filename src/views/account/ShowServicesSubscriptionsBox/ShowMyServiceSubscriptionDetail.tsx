import { useFetch } from '@/hooks/useFetch'
import { ServiceType } from '@/views/services/types'
import { Box, Typography } from '@mui/material'

interface Props {
  id: string
}

export default function ShowMyServiceSubscriptionDetail({ id }: Props) {
  const { data: service } = useFetch<ServiceType>(`/api/services/${id}`)

  return (
    <Box>
      <Typography variant='body2' color='text.secondary' textAlign={'center'}>
        {service?.description!}
      </Typography>
      <Typography variant='body2' color='text.secondary' textAlign={'center'}>
        R$ {service?.price.toLocaleString()} mensais
      </Typography>
    </Box>
  )
}
