import Container from '@/components/container'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ProfileView(props: Props) {
  const { session } = props

  return <Container>{JSON.stringify(session)}</Container>
}
