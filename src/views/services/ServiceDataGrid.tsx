import { ServiceDataGridProps } from './types'
import DataTable from '@/components/DataTable'
import { Suspense } from 'react'
import { ServiceDataGridColumns } from './ServiceDataGridColumns'

export default function ServiceDataGrid(props: ServiceDataGridProps) {
  const { services } = props

  return (
    <Suspense>
      <DataTable data={services!} columns={ServiceDataGridColumns} />
    </Suspense>
  )
}
