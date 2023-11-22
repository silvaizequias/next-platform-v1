import Container from '@/components/container'
import { Session } from 'next-auth'
import OrganizationUser from '../organizations/organization-user'
import UserSubscription from '../subscriptions/user-subscription'

interface Props {
  session: Session
}

export default function AccountView(props: Props) {
  const { session } = props

  return (
    <Container>
      <div className="py-10 flex justify-center">
        <h2 className="text-center text-2xl sm:text-4xl uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
          {`Olá ${session?.user?.name}`}
        </h2>
      </div>
      <OrganizationUser session={session} />
      <UserSubscription session={session} />
    </Container>
  )
}
