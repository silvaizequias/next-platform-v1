import Container from '@/components/container'
import UserTable from './user-table'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UserView(props: Props) {
  const { session } = props

  return (
    <Container>
      <div className="py-4">
        <UserTable />
      </div>
    </Container>
  )
}
