import { SubscriptionType } from '@/types/subscription'
import { KeyedMutator } from 'swr'
import SubscriptionUpdateForm from './SubscriptionUpdateForm'

interface Props {
  subscription: SubscriptionType
  subscriptions: SubscriptionType[]
  mutate: KeyedMutator<[]>
}

export default function SubscriptionUpdate(props: Props) {
  const { subscription, subscriptions, mutate } = props

  return (
    <SubscriptionUpdateForm
      subscription={subscription}
      subscriptions={subscriptions}
      mutate={mutate}
    />
  )
}
