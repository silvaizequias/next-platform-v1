'use client'

import { Add } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  colors,
  DialogContent,
  Tooltip,
  Button,
  Fab,
  Typography,
  DialogContentText,
} from '@mui/material'
import { useState, useCallback, Fragment, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DialogButton(props: Props) {
  const { children } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  return (
    <Fragment>
      <Tooltip title={'criar'} onClick={handleDialog}>
        <Fab variant="circular" size="small" color="primary">
          <Add sx={{ m: 1 }} />
        </Fab>
      </Tooltip>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleDialog}
        maxWidth={'xs'}
      >
        <DialogTitle sx={{ fontWeight: 600, color: colors.blue[400] }}>
          {'dedicado'}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Fragment>
  )
}
