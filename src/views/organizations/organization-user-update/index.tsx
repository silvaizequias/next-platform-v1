import { OrganizationUserType } from '@/types/organization'
import OrganizationUserUpdateForm from './OrganizationUserUpdateForm'

interface Props {
  organizationUser: OrganizationUserType
}

export default function OrganizationUserUpdate(props: Props) {
  const { organizationUser } = props

  return <OrganizationUserUpdateForm organizationUser={organizationUser} />
}
