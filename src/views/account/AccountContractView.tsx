import { useFetch } from '@/hooks/useFetch'
import { AccountContractViewProps } from './types'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { ContractType } from '../contracts/types'

export default function AccountContractView(props: AccountContractViewProps) {
  const { id } = props
  const { data: contract } = useFetch<ContractType>(`/api/contracts/${id}`)

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {contract?.contractCode}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {contract?.service?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
