import { PublicationType } from '../../types'
import UpdatePublicationForm from './form'

interface Props {
  publication: PublicationType
}

export default function PublicationDetailView(props: Props) {
  const { publication } = props

  return <UpdatePublicationForm publication={publication} />
}
