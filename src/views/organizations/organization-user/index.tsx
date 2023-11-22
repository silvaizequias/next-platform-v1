import Container from '@/components/container'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function OrganizationUser(props: Props) {
  const { session } = props

  return (
    <Container>
      <h4 className="text-center font-medium text-xl sm:text-2xl uppercase">
        Minhas Organizações
      </h4>
    </Container>
  )
}
