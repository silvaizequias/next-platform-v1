import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { SubscriptionType } from '../types'
import { Avatar, Box, Typography } from '@mui/material'

export const SubscriptionDataGridColumns: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'Usuário',
    headerAlign: 'left',
    align: 'left',
    flex: 0.2,
    minWidth: 80,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={params.row?.user?.image || '/avatar.png'}
          sx={{ mr: 3, width: 34, height: 34 }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          {params.row?.user?.name}
          <Typography noWrap variant='caption'>
            {params.row?.user?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Contratou em',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 60,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {new Date(params.row?.createdAt!).toLocaleDateString()}
      </Box>
    ),
  },
  {
    field: 'serviceName',
    headerName: 'Serviço',
    headerAlign: 'center',
    align: 'center',
    flex: 0.2,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.service?.name}
      </Box>
    ),
  },
  {
    field: 'servicePrice',
    headerName: 'Valor',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 60,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.service?.price.toLocaleString()}
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
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
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
    field: 'recurringInterval',
    headerName: 'Recorrência',
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
        {params.row?.recurringInterval}
      </Box>
    ),
  },
  {
    field: 'currentPeriodEnd',
    headerName: 'Finaliza em',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 60,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<SubscriptionType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {new Date(params.row?.currentPeriodEnd).toLocaleDateString()}
      </Box>
    ),
  },
]
