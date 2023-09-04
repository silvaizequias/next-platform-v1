import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ContractDataGridOptions from './ContractDataGridOptions'
import { ContractType } from './types'

export const ContractDataGridColumns: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.status}
      </Box>
    ),
  },
  {
    field: 'contractCode',
    headerName: 'Código',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.contractCode}
      </Box>
    ),
  },
  {
    field: 'customer',
    headerName: 'Cliente',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.user?.name}
      </Box>
    ),
  },
  {
    field: 'service',
    headerName: 'Serviço',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.service?.name}
      </Box>
    ),
  },
  {
    field: 'period',
    headerName: 'Período',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.period}
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
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <ContractDataGridOptions id={params.row?.id} />
    ),
  },
]
