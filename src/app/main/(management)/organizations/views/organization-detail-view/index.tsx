import { OrganizationType } from '../../types'
import UpdateOrganizationForm from './form'

interface Props {
  organization: OrganizationType
}

export default function OrganziationDetailView(props: Props) {
  const { organization } = props

  return <UpdateOrganizationForm organization={organization} />
}
