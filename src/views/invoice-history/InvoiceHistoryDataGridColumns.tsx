import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { InvoiceType } from '../invoices/types'
import PaymentButton from '@/components/PaymentButton'

export const InvoiceHistoryDataGridColumns: GridColDef[] = [
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
    headerName: 'Vencimento',
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
    field: 'paymentButton',
    headerName: '',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<InvoiceType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        <PaymentButton id={params.row?.id} />
      </Box>
    ),
  },
]
