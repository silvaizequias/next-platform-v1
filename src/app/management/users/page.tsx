import { actionGetUsers } from './actions'
import UserScreen from './screen'

export default async function UserPage() {
  const users = await actionGetUsers()

  return <UserScreen users={users} />
}
