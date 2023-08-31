import { AccountInvoicesDataGridProps } from './types'
import { InvoiceType } from '../invoices/types'
import { useFetch } from '@/hooks/useFetch'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Suspense, useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import { AccountInvoicesDataGridColumns } from './AccountInvoicesDataGridColumns'

export default function AccountInvoicesDataGrid(
  props: AccountInvoicesDataGridProps,
) {
  const { profile } = props
  const { data, error, mutate } = useFetch(`/api/invoices`)

  const invoices = data?.filter((invoices: InvoiceType) => {
    if (invoices?.contract?.user?.id == profile?.id) return invoices
  })

  return (
    <Suspense>
      <DataTable data={invoices!} columns={AccountInvoicesDataGridColumns} />
    </Suspense>
  )
}
