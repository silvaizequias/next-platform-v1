import { OrganizationType } from '@/types/platform-management/organization'

interface Props {
  organization: OrganizationType
}

export default function OrganizationDetailView(props: Props) {
  const { organization } = props

  return organization.name
}
