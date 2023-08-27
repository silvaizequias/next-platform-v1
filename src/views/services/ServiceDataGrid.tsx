import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ServiceDataGridProps } from './types'
import DataTable from '@/components/DataTable'
import { Box, Chip } from '@mui/material'

export default function ServiceDataGrid(props: ServiceDataGridProps) {
  const { services } = props
  const columns: GridColDef[] = [
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            textTransform: 'uppercase',
          }}
        >
          {params.row?.isActive == true ? (
            <Chip
              label={'ativo'}
              sx={{ bgcolor: 'green' }}
              variant='outlined'
            />
          ) : (
            <Chip
              label={'inativo'}
              sx={{ bgColor: 'gray' }}
              variant='outlined'
            />
          )}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome do Serviço',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            textTransform: 'uppercase',
          }}
        >
          {params.row?.name}
        </Box>
      ),
    },
    {
      field: 'solution',
      headerName: 'Solução',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            textTransform: 'uppercase',
          }}
        >
          {params.row?.solution}
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Preço',
      flex: 0.1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            textTransform: 'uppercase',
          }}
        >
          {params.row?.price}
        </Box>
      ),
    },
  ]

  return <DataTable data={services!} columns={columns} />
}
