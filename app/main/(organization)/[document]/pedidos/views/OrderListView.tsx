import { OrderType } from '@/types/order'
import CreateOrderView from './CreateOrderView'
import UpdateOrderView from './UpdateOrderView'

interface Props {
  data: OrderType[] | any
  authorizationKey: string
}

export default function OrderListView(props: Props) {
  const { data, authorizationKey } = props

  return (
    <div className="relative">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <CreateOrderView authorizationKey={authorizationKey} />
          <h6>criar pedido</h6>
        </div>
        <hr className="border-1 border-slate-400" />
        <ul className="w-full">
          {data?.map((order: OrderType) => {
            return (
              <li
                key={order?.id}
                className="my-2 p-4 bg-slate-200 dark:bg-slate-800 dark:text-sky-600 rounded-md hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <a className="flex flex-col">
                    <h6 className="text-xl hover:opacity-50 lowercase">{order?.code}</h6>
                    <small className="text-xs font-thin opacity-60 lowercase">
                      {order?.subject || order?.customer}
                    </small>
                  </a>
                  <div className="flex flex-1 justify-end space-x-2">
                    <UpdateOrderView
                      data={order}
                      authorizationKey={authorizationKey}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
