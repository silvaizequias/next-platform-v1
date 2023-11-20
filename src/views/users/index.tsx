import Container from '@/components/container'
import UserTable from './user-table'

export default function UserView() {
  return (
    <Container>
      <div className="py-4">
        <UserTable />
      </div>
    </Container>
  )
}
