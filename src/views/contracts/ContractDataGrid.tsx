import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ContractDataGridProps } from './types'
import DataTable from '@/components/DataTable'
import { Box } from '@mui/material'
import { Suspense } from 'react'

export default function ContractDataGrid(props: ContractDataGridProps) {
  const { contracts } = props

  const columns: GridColDef[] = [
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
      field: 'period',
      headerName: 'Período',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
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
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            textTransform: 'uppercase',
          }}
        >
          {params.row?.payment}
        </Box>
      ),
    },
  ]

  return (
    <Suspense>
      <DataTable data={contracts!} columns={columns} />
    </Suspense>
  )
}
