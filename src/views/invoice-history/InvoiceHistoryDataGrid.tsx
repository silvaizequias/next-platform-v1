import { InvoiceHistoryDataGridProps } from './types'
import { Suspense } from 'react'
import DataTable from '@/components/DataTable'
import { InvoiceHistoryDataGridColumns } from './InvoiceHistoryDataGridColumns'

export default function InvoiceHistoryDataGrid(
  props: InvoiceHistoryDataGridProps,
) {
  const { invoices } = props

  return (
    <Suspense>
      <DataTable data={invoices!} columns={InvoiceHistoryDataGridColumns} />
    </Suspense>
  )
}
