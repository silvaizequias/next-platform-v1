import Container from '@/components/container'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function AccountView(props: Props) {
  const { session } = props

  return (
    <Container>
      <span className="text-lg uppercase">{`Olá ${session.user?.name}`}</span>
    </Container>
  )
}
