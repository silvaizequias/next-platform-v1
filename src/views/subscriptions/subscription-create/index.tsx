import { SubscriptionType } from '@/types/subscription'
import { KeyedMutator } from 'swr'
import SubscriptionCreateForm from './SubscriptionCreateForm'

interface Props {
  subscriptions: SubscriptionType[]
  mutate: KeyedMutator<[]>
}

export default function SubscriptionCreate(props: Props) {
  const { subscriptions, mutate } = props

  return (
    <SubscriptionCreateForm subscriptions={subscriptions} mutate={mutate} />
  )
}
