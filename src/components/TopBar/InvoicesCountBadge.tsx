import { useFetch } from '@/hooks/useFetch'
import { InvoicesCountBadgeProps } from './types'
import { InvoiceType } from '@/views/invoices/types'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { MdPayments } from 'react-icons/md'

export default function InvoicesCountBadge(props: InvoicesCountBadgeProps) {
  const { profile } = props
  const { data, error, mutate } = useFetch(`/api/invoices`)

  const invoices = data?.filter((invoices: InvoiceType) => {
    if (
      invoices?.contract?.user?.id == profile?.id &&
      invoices?.status == 'PENDING'
    )
      return invoices
  })

  return (
    <Tooltip
      title={
        invoices?.length! > 0
          ? 'Você possui faturas em aberto!'
          : 'Você não possui faturas em aberto!'
      }
    >
      <IconButton sx={{ p: 0, color: 'white' }} size='medium'>
        <Badge color='warning' badgeContent={invoices?.length! || 0}>
          <MdPayments />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}
