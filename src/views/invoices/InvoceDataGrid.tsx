import DataTable from '@/components/DataTable'
import { InvoiceDataGridProps } from './types'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { Suspense, useState } from 'react'
import InvoiceDataGridOptions from './InvoiceDataGridOptions'

export default function InvoiceDataGrid(props: InvoiceDataGridProps) {
  const { invoices } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  const columns: GridColDef[] = [
    {
      field: 'invoiceCode',
      headerName: 'Código',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
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
      field: 'status',
      headerName: 'Status',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
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
      field: 'amount',
      headerName: 'Valor',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
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
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
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
      field: 'options',
      headerName: '',
      sortable: false,
      filterable: false,
      flex: 0.1,
      maxWidth: 50,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <InvoiceDataGridOptions id={params.row?.id} />
      ),
    },
  ]

  return (
    <Suspense>
      <DataTable data={invoices!} columns={columns} />
    </Suspense>
  )
}
