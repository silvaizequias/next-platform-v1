import { Box, Typography } from '@mui/material'
import { ShowMyServiceSubscriptionDetailProps } from '../types'

export default function ShowMyServiceSubscriptionDetail(
  props: ShowMyServiceSubscriptionDetailProps,
) {
  const { service, onClose } = props

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
