import { Box, Typography } from '@mui/material'
import { AccountUserProps } from './types'

export default function AccountHeaderView(props: AccountUserProps) {
  const { user } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        mx: 'auto',
      }}
    >
      <Typography variant='h4'>{`Olá ${user?.name!}!`}</Typography>
      <Typography variant='button' textTransform={'uppercase'} fontWeight={200}>
        Você ainda não tem nenhum serviço contratado!
      </Typography>
    </Box>
  )
}
