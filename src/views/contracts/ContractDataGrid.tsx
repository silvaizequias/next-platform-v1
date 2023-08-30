import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ContractDataGridProps } from './types'
import DataTable from '@/components/DataTable'
import { Box } from '@mui/material'
import { Suspense, useState } from 'react'
import ContractDataGridOptions from './ContractDataGridOptions'

export default function ContractDataGrid(props: ContractDataGridProps) {
  const { contracts } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

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
        <ContractDataGridOptions id={params.row?.id} />
      ),
    },
  ]

  return (
    <Suspense>
      <DataTable data={contracts!} columns={columns} />
    </Suspense>
  )
}
