import { Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

export const MyOrganizationPublicationsColumnsViews: GridColDef[] = [
  {
    field: 'title',
    headerName: 'título',
    flex: 0.2,
    minWidth: 140,
    filterable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="caption">{params.row?.title}</Typography>
    ),
  },
]
