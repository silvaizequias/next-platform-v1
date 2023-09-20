import { Suspense } from 'react'
import { MemberDataGridProps } from '../../types'
import DataTable from '@/components/DataTable'
import { MemberDataGridColumns } from './columns'

export default function MemberDataGrid(props: MemberDataGridProps) {
  const { members } = props

  return (
    <Suspense>
      <DataTable data={members!} columns={MemberDataGridColumns} />
    </Suspense>
  )
}
