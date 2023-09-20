import { Suspense } from 'react'
import { CustomerDataGridProps } from '../../types'
import DataTable from '@/components/DataTable'
import { CustomerDataGridColumns } from './columns'

export default function CustomerDataGrid(props: CustomerDataGridProps) {
  const { customers } = props

  return (
    <Suspense>
      <DataTable data={customers!} columns={CustomerDataGridColumns} />
    </Suspense>
  )
}
