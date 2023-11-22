import Container from '@/components/container'
import OrganizationTable from './organization-table'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function OrganizationView(props: Props) {
  const { session } = props

  return (
    <Container>
      <OrganizationTable />
    </Container>
  )
}
