import { Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

export const MyOrganziationOrdersColumnsView: GridColDef[] = [
  {
    field: 'code',
    headerName: 'código',
    flex: 0.2,
    minWidth: 140,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="caption">{params.row?.code}</Typography>
    ),
  },
]
