import DataTable from '@/components/data-table'
import Spinner from '@/components/spinner'
import { Suspense } from 'react'
import { MemberDataGridColumns } from './columns'
import { MemberDataGridProps } from '../types'

export default function MemberDataGrid(props: MemberDataGridProps) {
  const { users } = props

  return (
    <Suspense fallback={<Spinner />}>
      <DataTable data={users} columns={MemberDataGridColumns} />
    </Suspense>
  )
}
