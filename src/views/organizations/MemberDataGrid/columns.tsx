import { OrganizationOfUserType } from '@/types/organization-of-user'
import { Avatar, Box, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

export const MemberDataGridColumns: GridColDef[] = [
  {
    field: 'user',
    headerName: 'Usuário',
    headerAlign: 'left',
    align: 'left',
    flex: 0.2,
    minWidth: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<OrganizationOfUserType>) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={params.row?.user?.image! || '/avatar.png'}
          sx={{ mr: 3, width: 34, height: 34 }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          {params.row?.user?.name!}
          <Typography noWrap variant='caption'>
            {params.row?.user?.email!}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'profile',
    headerName: 'Perfil',
    headerAlign: 'center',
    align: 'center',
    flex: 0.1,
    minWidth: 80,
    sortable: true,
    filterable: true,
    renderCell: (params: GridRenderCellParams<OrganizationOfUserType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.user?.profile!}
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
    renderCell: (params: GridRenderCellParams<OrganizationOfUserType>) => (
      <Box
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {params.row?.role!}
      </Box>
    ),
  },
]
