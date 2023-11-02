import CreatePostForm from '@/views/blog/forms/CreatePostForm'
import { Add } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Modal,
  Tooltip,
} from '@mui/material'
import { Session } from 'next-auth'
import { useState } from 'react'

export default function AddPost({ session }: { session: Session }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Box>
      <Tooltip title={`Adicionar Postagem`} onClick={handleDialog}>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Add />
        </IconButton>
      </Tooltip>
      <Dialog keepMounted open={openDialog} onClose={handleDialog}>
        <DialogContent>
          <CreatePostForm />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
