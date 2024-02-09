import { Box, Avatar, Typography, Chip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { celularMask } from 'masks-br'

export const UsersColumnsView: GridColDef[] = [
  {
    field: 'user',
    headerName: 'usuário',
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
          <Typography variant="h6">{params.row.name}</Typography>
          <Typography variant="caption">
            {celularMask(params.row?.phone)}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'role',
    headerName: 'função',
    flex: 0.1,
    minWidth: 40,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Chip label={params.row?.profile} color="success" variant="outlined" />
    ),
  },
  {
    field: 'status',
    headerName: 'status',
    flex: 0.1,
    minWidth: 40,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.row?.active ? 'ativo' : 'inativo'}
        color="success"
        variant="outlined"
      />
    ),
  },
]
