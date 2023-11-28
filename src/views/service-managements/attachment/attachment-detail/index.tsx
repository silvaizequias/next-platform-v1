'use client'

import { OrderAttachmentType } from '@/types/order'

interface Props {
  attachment: OrderAttachmentType
}

export default function ServiceAttachmentDetail(props: Props) {
  const { attachment } = props

  return JSON.stringify(attachment)
}
