'use client'

import { Card, CardContent } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { UserType } from '../types'
import { UsersColumnsView } from './UsersColumnsView'

interface Props {
  users: UserType | any
}

export default function UsersListView(props: Props) {
  const { users } = props

  return (
    <Card sx={{ minWidth: '380px' }}>
      <CardContent sx={{ width: '100%' }}>
        <DataGrid
          autoHeight
          getRowId={(user) => user?.id}
          rows={users}
          columns={UsersColumnsView}
          disableColumnSelector
        />
      </CardContent>
    </Card>
  )
}
