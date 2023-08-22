'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Card, Container, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
    flex: 0.1,
    minWidth: 160,
    sortable: true,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.name}
      </Typography>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Criado em',
    flex: 0.1,
    minWidth: 160,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row?.createdAt).toLocaleDateString()}
      </Typography>
    ),
  },
]

export default function UsersPage(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: users, error, mutate } = useFetch(`/api/users`)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const userData = async () => {
      setRows(users)
    }
    userData()
  }, [users])

  return (
    <Container sx={{ py: 12 }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              getRowId={(row) => row.id}
              rows={rows}
              columns={columns}
              disableColumnSelector
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
