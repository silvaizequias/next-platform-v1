import DataTable from '@/components/DataTable'
import {
  Avatar,
  Box,
  Chip,
  Typography,
} from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { UserDataGridProps } from './types'
import { Suspense, useState } from 'react'
import UserDataGridOptions from './UserDataGridOptions'

export default function UserDataGrid(props: UserDataGridProps) {
  const { users } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  const columns: GridColDef[] = [
    {
      flex: 0.3,
      minWidth: 140,
      field: 'name',
      headerName: 'Usuário',
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={params.row?.avatar || '/avatar.png'}
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
      flex: 0.1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
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
              label={'ativa'}
              sx={{ bgcolor: 'green' }}
              variant='outlined'
            />
          ) : (
            <Chip
              label={'inativa'}
              sx={{ bgColor: 'gray' }}
              variant='outlined'
            />
          )}
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
        <UserDataGridOptions id={params.row?.id} />
      ),
    },
  ]

  return (
    <Suspense>
      <DataTable data={users} columns={columns} />
    </Suspense>
  )
}
