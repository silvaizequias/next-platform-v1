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

export default function AccountInvoicesDataGrid(
  props: AccountInvoicesDataGridProps,
) {
  const { profile } = props
  const { data, error, mutate } = useFetch<InvoiceType[]>(`/api/invoices`)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Criada em</TableCell>
            <TableCell>Serviço</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Pagar até</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(
            (invoice: InvoiceType) =>
              invoice?.contract?.user?.id == profile?.id && (
                <TableRow
                  key={invoice?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {invoice?.invoiceCode}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice?.contract?.service?.name}</TableCell>
                  <TableCell>{invoice?.amount}</TableCell>
                  <TableCell>
                    {new Date(invoice?.payUpTo).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice?.status}</TableCell>
                </TableRow>
              ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
