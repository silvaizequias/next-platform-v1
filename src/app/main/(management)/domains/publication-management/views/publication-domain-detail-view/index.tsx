import { DomainType } from '../../../types'
import UpdatePublicationDomainForm from './form'

interface Props {
  domain: DomainType
}

export default function PublicationDomainDetailView(props: Props) {
  const { domain } = props

  return <UpdatePublicationDomainForm domain={domain} />
}
