import { Avatar, Box, Chip, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import UserDataGridOptions from './UserDataGridOptions'
import { UserType } from './types'

export const UserDataGridColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Usuário',
    headerAlign: 'left',
    align: 'left',
    flex: 0.2,
    minWidth: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<UserType>) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={params.row?.image || '/avatar.png'}
          sx={{ mr: 3, width: 34, height: 34 }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          {params.row?.name}
          <Typography noWrap variant='caption'>
            {params.row?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'role',
    headerName: 'Função',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<UserType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.role}
      </Box>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Criada em',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<UserType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {new Date(params.row?.createdAt).toLocaleString()}
      </Box>
    ),
  },
  {
    field: 'isActive',
    headerName: 'Status',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,

    renderCell: (params: GridRenderCellParams<UserType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.isActive == true ? (
          <Chip label={'ativa'} sx={{ bgcolor: 'green' }} variant='outlined' />
        ) : (
          <Chip label={'inativa'} sx={{ bgColor: 'gray' }} variant='outlined' />
        )}
      </Box>
    ),
  },
  {
    field: 'contracts',
    headerName: 'Contratações',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<UserType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.contracts.length!}
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
    renderCell: (params: GridRenderCellParams<UserType>) => (
      <UserDataGridOptions id={params.row?.id} />
    ),
  },
]
