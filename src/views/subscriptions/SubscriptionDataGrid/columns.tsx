import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { SubscriptionType } from '../types'
import { Box } from '@mui/material'

export const SubscriptionDataGridColumns: GridColDef[] = [
  {
    field: 'createdAt',
    headerName: 'Criada em',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {new Date(params.row?.createdAt!).toLocaleString()}
      </Box>
    ),
  },
]
