import OrderCreateForm from '@/views/service-management/forms/OrderCreateForm'
import { Add } from '@mui/icons-material'
import { Box, Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import { Session } from 'next-auth'
import { useState } from 'react'

export default function AddOrder({ session }: { session: Session }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Box>
      <Tooltip title={`Adicionar Ordem de Serviço`} onClick={handleDialog}>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Add />
        </IconButton>
      </Tooltip>
      <Dialog keepMounted open={openDialog} onClose={handleDialog}>
        <DialogContent>
          <OrderCreateForm />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
