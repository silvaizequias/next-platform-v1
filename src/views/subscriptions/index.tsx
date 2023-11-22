import Container from '@/components/container'
import { Session } from 'next-auth'
import SubscriptionTable from './subscription-table'

interface Props {
  session: Session
}

export default function SubscriptionView(props: Props) {
  const { session } = props

  return (
    <Container>
      <SubscriptionTable />
    </Container>
  )
}
