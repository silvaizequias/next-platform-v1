import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ContractDataGridOptions from './ContractDataGridOptions'
import { ContractType } from './types'

export const ContractDataGridColumns: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.1,
    minWidth: 80,
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
    field: 'period',
    headerName: 'Período',
    flex: 0.1,
    minWidth: 80,
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
    field: 'payment',
    headerName: 'Pagamento',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.payment}
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
    renderCell: (params: GridRenderCellParams<ContractType>) => (
      <ContractDataGridOptions id={params.row?.id} />
    ),
  },
]
