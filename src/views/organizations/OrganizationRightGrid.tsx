import { Box, Card, IconButton, Tooltip, Typography } from '@mui/material'
import { OrganizationProps } from './types'
import MemberDataGrid from './MemberDataGrid'
import { MdPersonAddAlt } from 'react-icons/md'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import AddMemberForm from './forms/AddMemberForm'
import ShowInDialog from '@/components/show-in-dialog'

export default function OrganizationRightGrid(props: OrganizationProps) {
  const { organization } = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          mb: 4,
        }}
        onClick={handleDialog}
      >
        <Tooltip title='Adicionar Membro'>
          <IconButton
            sx={{
              p: 1,
              m: 0,
              color: grey[50],
            }}
          >
            <MdPersonAddAlt />
          </IconButton>
        </Tooltip>
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', md: { textAlign: 'right' } }}
        >{`Membros da Organização ${organization?.name}`}</Typography>
      </Box>
      <ShowInDialog
        open={openDialog}
        onClose={handleDialog}
        title={`Adicionar Membro a ${organization?.name!}`}
      >
        <AddMemberForm organization={organization!} />
      </ShowInDialog>
      <Card elevation={4}>
        <MemberDataGrid users={organization?.users!} />
      </Card>
    </Box>
  )
}
