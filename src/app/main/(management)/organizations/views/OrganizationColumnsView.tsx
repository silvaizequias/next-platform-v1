import { Box, Avatar, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { cnpjMask } from 'masks-br'

export const OrganizationColumnsView: GridColDef[] = [
  {
    field: 'organization',
    headerName: 'organização',
    flex: 0.2,
    minWidth: 140,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={params.row?.image} sx={{ mr: 3, width: 34, height: 34 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            textTransform: 'lowercase',
          }}
        >
          <Typography variant="h6">{params.row?.name}</Typography>
          <Typography variant="caption">
            {cnpjMask(params.row?.document)}
          </Typography>
        </Box>
      </Box>
    ),
  },
]
