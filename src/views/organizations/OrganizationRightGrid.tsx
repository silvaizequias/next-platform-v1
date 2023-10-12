import { Box, Card, Typography } from '@mui/material'
import { OrganizationProps } from './types'
import MemberDataGrid from './MemberDataGrid'

export default function OrganizationRightGrid(props: OrganizationProps) {
  const { organization } = props

  return (
    <Box>
      <Typography
        variant='h4'
        textAlign={'center'}
        marginBottom={4}
      >{`Membros da Organização ${organization?.name}`}</Typography>
      <Card elevation={4}>
        <MemberDataGrid users={organization?.users!} />
      </Card>
    </Box>
  )
}
