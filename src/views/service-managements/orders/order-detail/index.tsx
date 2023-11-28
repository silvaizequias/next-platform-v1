'use client'

import { OrderType } from '@/types/order'

interface Props {
  order: OrderType
}

export default function ServiceOrderDetail(props: Props) {
  const { order } = props

  return JSON.stringify(order)
}
