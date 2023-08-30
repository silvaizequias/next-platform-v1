import { useFetch } from '@/hooks/useFetch'
import { AccountContractViewProps } from './types'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { ContractType } from '../contracts/types'
import { useState } from 'react'
import ShowInDialog from '@/components/ShowInDialog'
import AccountContractDetail from './AccountContractDetail'

export default function AccountContractView(props: AccountContractViewProps) {
  const { id } = props
  const { data: contract } = useFetch<ContractType>(`/api/contracts/${id}`)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleShowInDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Card>
      <CardActionArea onClick={handleShowInDialog}>
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {contract?.contractCode}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {contract?.service?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <ShowInDialog
        open={openDialog}
        onClose={handleShowInDialog}
        title={`${contract?.contractCode} : ${contract?.service?.name}`}
      >
        <AccountContractDetail contract={contract!} />
      </ShowInDialog>
    </Card>
  )
}
