'use client'

import { OrderType } from '@/types/order'
import Unauthorized from '@/components/Unauthorized'
import moment from 'moment'
import 'moment/locale/pt-br'
import UpdateOrderView from './UpdateOrderView'
import { Suspense } from 'react'
import { useOrder } from '@/contexts/OrderContext'

export default function OrderListView() {
  const { orders }: OrderType[] | any = useOrder()

  return (
    <div className="relative">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2"></div>
        <hr className="border-1 border-slate-400" />
        <Suspense>
          {orders?.length > 0 ? (
            <ul className="w-full">
              {orders?.message ? (
                <div className="block">
                  <Unauthorized
                    message={orders?.message}
                    statusCode={orders?.statusCode}
                  />
                </div>
              ) : (
                orders?.map((order: OrderType) => {
                  return (
                    !order?.completed && (
                      <li
                        key={order?.id}
                        className="my-2 p-4 bg-slate-200 dark:bg-slate-800 dark:text-sky-600 rounded-md hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center justify-between space-x-2">
                          <a className="flex flex-1 flex-col">
                            <h6 className="text-xl hover:opacity-50 lowercase">
                              {`${order?.code} :: ${order?.subject}`}
                            </h6>
                            <small className="text-xs font-thin opacity-60 lowercase">
                              {order?.observation}
                            </small>
                          </a>
                          <div className="flex items-center space-x-2">
                            {order?.deadline && (
                              <div className="relative w-full flex flex-col justify-end">
                                <small className="text-xs text-orange-600 text-right">
                                  prazo final
                                </small>
                                <span className="text-xs text-yellow-600 text-end">
                                  {moment(order?.deadline).format('lll')}
                                </span>
                              </div>
                            )}
                            <UpdateOrderView order={order} />
                          </div>
                        </div>
                      </li>
                    )
                  )
                })
              )}
            </ul>
          ) : (
            <div className="relative">
              <div className="py-4">
                <h4 className="text-center text-xl dark:text-white lowercase ">
                  não existem pedidos para esta organização
                </h4>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
