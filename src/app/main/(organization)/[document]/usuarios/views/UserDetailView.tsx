import { OrganizationUserType } from '@/types/organization-user.type'
import { OrganizationType } from '@/types/organization.type'
import { Session } from 'next-auth'
import UserListView from './UserListView'
import { MdGppMaybe } from 'react-icons/md'

interface Props {
  data: OrganizationType | any
  session: Session
}

export default function UserDetailView(props: Props) {
  const { data, session } = props

  const organizationUser =
    session &&
    data?.users?.find(
      (users: OrganizationUserType) =>
        users?.user?.id === session?.user?.id &&
        users?.role.includes('owner' || 'administrator'),
    )

  return organizationUser ? (
    <div className="w-full">
      <UserListView data={data?.users} />
    </div>
  ) : (
    <div className="w-full flex flex-col justify-center items-center space-y-2">
      <span className="flex rounded-full p-2 text-sky-600 bg-sky-400/25">
        <MdGppMaybe size={64} />
      </span>
      <h4 className="text-2xl text-center text-sky-600 font-semibold">
        {`sua função na organização ${data?.name} não permite visualizar essa informação`}
      </h4>
    </div>
  )
}
