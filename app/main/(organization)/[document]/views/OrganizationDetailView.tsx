import { OrganizationType } from '@/types/organization'
import { OrganizationUserType } from '@/types/organization-user'
import { Session } from 'next-auth'
import { MdGppMaybe, MdGroups, MdListAlt } from 'react-icons/md'

interface Props {
  data: OrganizationType | any
  session: Session
}

export default function OrganizationDetailView(props: Props) {
  const { data, session } = props

  const organizationUser =
    session &&
    data?.users?.find(
      (users: OrganizationUserType) =>
        users?.user?.id === session?.user?.id &&
        users?.role.includes('owner' || 'administrator'),
    )

  return organizationUser ? (
    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4">
      <a
        href={`${data?.document}/usuarios`}
        className="p-4 max-w-md w-full flex items-center bg-slate-200 rounded-md shadow-md gap-4 hover:opacity-80"
      >
        <MdGroups size={32} />
        <h4 className="text-xl font-semibold ">usuários da organização</h4>
      </a>
      <a
        href={`${data?.document}/pedidos`}
        className="p-4 max-w-md w-full flex items-center bg-slate-200 rounded-md shadow-md gap-4 hover:opacity-80"
      >
        <MdListAlt size={32} />
        <h4 className="text-xl font-semibold ">pedidos da organização</h4>
      </a>
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
