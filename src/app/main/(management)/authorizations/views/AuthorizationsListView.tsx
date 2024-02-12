'use client'

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
import { OrganizationKeyType } from '../types'
import { AuthorizationsColumnsView } from './AuthorizationsColumnsView'
import CreateAuthorizationFormView from './CreateAuthorizationFormView'
import { Fragment, useCallback, useState } from 'react'
import { Add } from '@mui/icons-material'

interface Props {
  authorizations: OrganizationKeyType[] | any
}

export default function AuthorizationsListView(props: Props) {
  const { authorizations } = props

  const [createAuthorization, setCreateAuthorization] = useState<boolean>(false)
  const handleCreateAuthorization = useCallback(() => {
    setCreateAuthorization(!createAuthorization)
  }, [createAuthorization])

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
          <Tooltip title={'criar'} onClick={handleCreateAuthorization}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(authorization) => authorization?.id}
          rows={authorizations}
          columns={AuthorizationsColumnsView}
          disableColumnSelector
        />
      </Box>
      <Dialog
        open={createAuthorization}
        keepMounted
        onClose={handleCreateAuthorization}
        maxWidth={'xs'}
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
        <DialogContent>
          <CreateAuthorizationFormView onClose={handleCreateAuthorization} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
