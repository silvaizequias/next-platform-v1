import { OrderItemType } from '@/types/order'

interface Props {
  item: OrderItemType
}

export default function ServiceOrderItemDetail(props: Props) {
  const { item } = props

  return JSON.stringify(item)
}
