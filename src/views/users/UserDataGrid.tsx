import DataTable from '@/components/DataTable'
import { UserDataGridProps } from './types'
import { Suspense } from 'react'
import { UserDataGridColumns } from './UserDataGridColumns'

export default function UserDataGrid(props: UserDataGridProps) {
  const { users } = props

  return (
    <Suspense>
      <DataTable data={users} columns={UserDataGridColumns} />
    </Suspense>
  )
}
