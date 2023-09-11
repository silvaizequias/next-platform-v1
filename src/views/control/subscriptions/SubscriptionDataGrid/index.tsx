import DataTable from '@/components/DataTable'
import { SubscriptionDataGridProps } from '../types'
import { SubscriptionDataGridColumns } from './columns'

export default function SubscriptionDataGrid(props: SubscriptionDataGridProps) {
  const { subscriptions } = props

  return (
    <DataTable data={subscriptions} columns={SubscriptionDataGridColumns} />
  )
}
