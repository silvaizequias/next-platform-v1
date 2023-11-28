import { OrderItemType } from '@/types/order'
import ServiceOrderItemUpdateForm from './ServiceOrderItemUpdateForm'

interface Props {
  item: OrderItemType
}

export default function ServiceOrderItemUpdate(props: Props) {
  const { item } = props

  return <ServiceOrderItemUpdateForm item={item} />
}
