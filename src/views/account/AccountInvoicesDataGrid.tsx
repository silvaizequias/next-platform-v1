import { AccountInvoicesDataGridProps } from './types'
import { Suspense } from 'react'
import DataTable from '@/components/DataTable'
import { AccountInvoicesDataGridColumns } from './AccountInvoicesDataGridColumns'

export default function AccountInvoicesDataGrid(
  props: AccountInvoicesDataGridProps,
) {
  const { invoices } = props

  return (
    <Suspense>
      <DataTable data={invoices!} columns={AccountInvoicesDataGridColumns} />
    </Suspense>
  )
}
