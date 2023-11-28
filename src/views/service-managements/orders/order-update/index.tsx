import { OrderType } from '@/types/order'
import ServiceOrderUpdateForm from './ServiceOrderUpdateForm'

interface Props {
  order: OrderType
}

export default function ServiceOrderUpdate(props: Props) {
  const { order } = props

  return <ServiceOrderUpdateForm order={order} />
}
