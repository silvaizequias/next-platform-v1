import { OrderAttachmentType } from '@/types/order'
import ServiceAttachmentUpdateForm from './ServiceAttachmentUpdateForm'

interface Props {
  attachment: OrderAttachmentType
}

export default function ServiceAttachmentUpdate(props: Props) {
  const { attachment } = props

  return <ServiceAttachmentUpdateForm attachment={attachment} />
}
