import { Box, Avatar, Typography, Chip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { cnpjMask } from 'masks-br'

export const SubscriptionsColumnsView: GridColDef[] = [
  {
    field: 'organization',
    headerName: 'organização',
    flex: 0.2,
    minWidth: 140,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={params.row?.organization.image}
          sx={{ mr: 3, width: 34, height: 34 }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            textTransform: 'lowercase',
          }}
        >
          <Typography variant="h6">{params.row?.organization?.name}</Typography>
          <Typography variant="caption">
            {cnpjMask(params.row?.organization?.document)}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'spendLimit',
    headerName: 'limite',
    flex: 0.2,
    minWidth: 140,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.row?.spendLimit}
        color="success"
        variant="outlined"
        size="small"
      />
    ),
  },
  {
    field: 'price',
    headerName: 'valor',
    flex: 0.2,
    minWidth: 140,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="caption">{`R$ ${params.row?.price}`}</Typography>
    ),
  },
]
