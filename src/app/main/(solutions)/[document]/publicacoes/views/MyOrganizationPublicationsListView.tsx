'use client'

import { PublicationType } from '@/app/main/(management)/publications/types'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  colors,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { MyOrganizationPublicationsColumnsViews } from './MyOrganizationPublicationsColumnsViews'
import { useState, useCallback, Fragment } from 'react'
import { Add } from '@mui/icons-material'

interface Props {
  publications: PublicationType[] | any
}

export default function MyOrganizationPublicationsListView(props: Props) {
  const { publications } = props

  const [createPublication, setCreatePublication] = useState<boolean>(false)
  const handleCreatePublication = useCallback(() => {
    setCreatePublication(!createPublication)
  }, [createPublication])

  return (
    <Fragment>
      <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            paddingY: 2,
          }}
        >
          <Tooltip title={'criar'} onClick={handleCreatePublication}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(publication) => publication?.id}
          rows={publications}
          columns={MyOrganizationPublicationsColumnsViews}
          disableColumnSelector
        />
      </Box>
      <Dialog
        open={createPublication}
        keepMounted
        onClose={handleCreatePublication}
        maxWidth={'md'}
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: colors.blue[400],
            textTransform: 'lowercase',
          }}
        >
          {'dedicado'}
        </DialogTitle>
        <DialogContent>...</DialogContent>
      </Dialog>
    </Fragment>
  )
}
