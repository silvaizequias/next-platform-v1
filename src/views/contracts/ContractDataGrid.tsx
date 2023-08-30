import { ContractDataGridProps } from './types'
import DataTable from '@/components/DataTable'
import { Suspense } from 'react'
import { ContractDataGridColumns } from './ContractDataGridColumns'

export default function ContractDataGrid(props: ContractDataGridProps) {
  const { contracts } = props

  return (
    <Suspense>
      <DataTable data={contracts!} columns={ContractDataGridColumns} />
    </Suspense>
  )
}
