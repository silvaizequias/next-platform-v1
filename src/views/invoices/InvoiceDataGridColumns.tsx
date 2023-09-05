import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { InvoiceType } from './types'
import InvoiceDataGridOptions from './InvoiceDataGridOptions'

export const InvoiceDataGridColumns: GridColDef[] = [
  {
    field: 'invoiceCode',
    headerName: 'Código',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.invoiceCode}
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
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.contract?.user?.name}
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
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.contract?.service?.name}
      </Box>
    ),
  },
  {
    field: 'amount',
    headerName: 'Valor',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.amount}
      </Box>
    ),
  },
  {
    field: 'payUpTo',
    headerName: 'Vence em',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {new Date(params.row?.payUpTo).toLocaleDateString()}
      </Box>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
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
    field: 'options',
    headerName: '',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    maxWidth: 50,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <InvoiceDataGridOptions id={params.row?.id} />
    ),
  },
]
