import { Box, Chip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ServiceDataGridOptions from './ServiceDataGridOptions'
import { ServiceType } from './types'

export const ServiceDataGridColumns: GridColDef[] = [
  {
    field: 'isActive',
    headerName: 'Status',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.isActive == true ? (
          <Chip label={'ativo'} sx={{ bgcolor: 'green' }} variant='outlined' />
        ) : (
          <Chip label={'inativo'} sx={{ bgColor: 'gray' }} variant='outlined' />
        )}
      </Box>
    ),
  },
  {
    field: 'name',
    headerName: 'Nome do Serviço',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.name}
      </Box>
    ),
  },
  {
    field: 'solution',
    headerName: 'Solução',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.solution}
      </Box>
    ),
  },
  {
    field: 'price',
    headerName: 'Preço',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.price}
      </Box>
    ),
  },
  {
    field: 'options',
    headerName: '',
    sortable: false,
    filterable: false,
    flex: 0.1,
    maxWidth: 50,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <ServiceDataGridOptions id={params.row?.id} />
    ),
  },
]
