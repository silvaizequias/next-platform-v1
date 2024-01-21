import { OrganizationUsersType } from '../../../types'
import UpdateOrganizationUserForm from './form'

interface Props {
  organizationUser: OrganizationUsersType
}

export default function OrganizationUserDetailView(props: Props) {
  const { organizationUser } = props
  return <UpdateOrganizationUserForm organizationUser={organizationUser} />
}
