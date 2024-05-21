'use client'

import { usePlatform } from '@/contexts/PlatformContext'
import { OrderType } from '@/types/order'
import { MdListAlt } from 'react-icons/md'
import moment from 'moment'
import 'moment/locale/pt-br'
import Unauthorized from '@/components/Unauthorized'
import { Suspense } from 'react'

export default function MemberOrderListView() {
  const { orders }: OrderType[] | any = usePlatform()

  return (
    <div className="relative">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-2">
          <span className="flex rounded-full p-1 cursor-pointer hover:opacity-50 hover:shadow-md dark:text-sky-600">
            <MdListAlt size={24} />
          </span>
          <h6 className="text-lg font-semibold lowercase dark:text-sky-600">
            demandas de serviço
          </h6>
        </div>
        <Suspense>
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
                        <a className="flex flex-1  flex-col">
                          <h6 className="text-xl hover:opacity-50 lowercase">
                            {order?.subject}
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
                        </div>
                      </div>
                    </li>
                  )
                )
              })
            )}
          </ul>
        </Suspense>
      </div>
    </div>
  )
}
