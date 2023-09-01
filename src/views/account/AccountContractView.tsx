import { useFetch } from '@/hooks/useFetch'
import { AccountContractViewProps } from './types'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              gutterBottom
              variant={'body1'}
              textTransform={'uppercase'}
            >
              {contract?.service?.name}
            </Typography>
            <Chip
              label={contract?.status}
              color='info'
              variant='outlined'
              sx={{ fontSize: 11 }}
            />
          </Box>
          <Typography variant={'body2'} color={'text.secondary'}>
            {contract?.service?.description}
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
