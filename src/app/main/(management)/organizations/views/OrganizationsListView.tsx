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
import { OrganizationType } from '../types'
import { DataGrid } from '@mui/x-data-grid'
import { OrganizationColumnsView } from './OrganizationColumnsView'
import CreateOrganizationFormView from './CreateOrganizationFormView'
import { Fragment, useCallback, useState } from 'react'
import { Add } from '@mui/icons-material'

interface Props {
  organizations: OrganizationType[] | any
}

export default function OrganizationListView(props: Props) {
  const { organizations } = props

  const [createOrganization, setCreateOrganization] = useState<boolean>(false)
  const handleCreateOrganization = useCallback(() => {
    setCreateOrganization(!createOrganization)
  }, [createOrganization])

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
          <Tooltip title={'adicionar'} onClick={handleCreateOrganization}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(organization) => organization?.id}
          rows={organizations}
          columns={OrganizationColumnsView}
          disableColumnSelector
        />
      </Box>
      <Dialog
        open={createOrganization}
        keepMounted
        onClose={handleCreateOrganization}
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
          <CreateOrganizationFormView onClose={handleCreateOrganization} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
