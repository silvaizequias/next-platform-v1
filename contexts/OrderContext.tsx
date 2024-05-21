'use client'

import { Session } from 'next-auth'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useOrganization } from './OrganizationContext'
import { OrderType } from '@/types/order'
import { orderRepositoryFindByOrganization } from '@/repositories/order/GET'

interface Props {
  orders: OrderType[]
}

const OrderContext = createContext<Props | any>({})

export const OrderProvider = ({
  children,
  document,
  session,
}: Readonly<{
  children: ReactNode
  document: string
  session: Session
}>) => {
  const { authorizationKey }: string | any = useOrganization()
  const authorization: string = useMemo(() => {
    return authorizationKey
  }, [authorizationKey])

  const [orders, setOrders] = useState<OrderType>()

  const getOrders = useCallback(async () => {
    if (!authorization) return null

    await orderRepositoryFindByOrganization(document, authorization).then(
      (data) => setOrders(data),
    )
  }, [authorization, document])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  return (
    <OrderContext.Provider value={session ? { orders } : null}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = (): Promise<Props> => {
  return useContext(OrderContext)
}

export const OrderConsumer = OrderContext.Consumer
