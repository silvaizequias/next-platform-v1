import { Box, Chip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ServiceDataGridOptions from './ServiceDataGridOptions'
import { ServiceType } from './types'

export const ServiceDataGridColumns: GridColDef[] = [
  {
    field: 'serviceCode',
    headerName: 'Código',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.serviceCode}
      </Box>
    ),
  },
  {
    field: 'name',
    headerName: 'Nome do Serviço',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
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
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
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
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
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
    field: 'contracts',
    headerName: 'Contratos',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.contracts.length!}
      </Box>
    ),
  },
  {
    field: 'isActive',
    headerName: 'Status',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
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
    field: 'options',
    headerName: '',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    maxWidth: 50,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<ServiceType>) => (
      <ServiceDataGridOptions id={params.row?.id} />
    ),
  },
]
