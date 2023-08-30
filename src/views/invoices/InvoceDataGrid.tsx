import DataTable from '@/components/DataTable'
import { InvoiceDataGridProps } from './types'
import { Suspense } from 'react'
import { InvoiceDataGridColumns } from './InvoiceDataGridColumns'

export default function InvoiceDataGrid(props: InvoiceDataGridProps) {
  const { invoices } = props

  return (
    <Suspense>
      <DataTable data={invoices!} columns={InvoiceDataGridColumns} />
    </Suspense>
  )
}
