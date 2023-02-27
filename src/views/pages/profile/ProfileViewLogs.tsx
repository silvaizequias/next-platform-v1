import { Box, Card, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useFetch } from 'src/hooks/useFetch'

import CustomAvatar from 'src/@core/components/mui/avatar'

const columns: GridColDef[] = [
  {
    field: 'createdAt',
    headerName: 'Registro',
    flex: 0.2,
    minWidth: 160,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row.createdAt).toLocaleString()}
      </Typography>
    ),
  },
  {
    field: 'system',
    headerName: 'Sistema',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.system}
      </Typography>
    ),
  },
  {
    field: 'ip',
    headerName: 'IP',
    flex: 0.1,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.ip}
      </Typography>
    ),
  },
  {
    field: 'isp',
    headerName: 'Operadora',
    flex: 0.2,
    minWidth: 90,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.isp}
      </Typography>
    ),
  },
  {
    field: 'country',
    headerName: 'País',
    flex: 0.1,
    minWidth: 160,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar
          src={params.row.countryFlag}
          sx={{ mr: 3, width: 24, height: 24 }}
        />
      </Box>
    ),
  },
]

export default function ProfileViewLogs() {
  const { data: session } = useSession()

  //@ts-ignore
  const userId = session?.user?.id

  // @ts-ignore
  const authorization = session?.user?.authorization
  const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/users/' + userId
  const options = {
    headers: { Authorization: `Bearer ${authorization}` },
  }
  const { data: user } = useFetch(endpoint, options)

  const [rows, setRows] = useState([])
  const [pageSize, setPageSize] = useState<number>(8)

  useEffect(() => {
    const userData = async () => {
      setRows(user?.logs)
    }
    if (user?.logs?.length >= 1) userData()
  })

  return session ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick={true}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  ) : null
}
