import { OrderType } from '@/types/order'
import moment from 'moment'
import 'moment/locale/pt-br'
import { MdListAlt } from 'react-icons/md'

interface Props {
  data: OrderType[] | any
}

export default function UserOrderListView(props: Props) {
  const { data } = props

  return (
    <div className="relative">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center space-x-2">
          <span className="flex rounded-full p-1 cursor-pointer hover:opacity-50 hover:shadow-md">
            <MdListAlt size={24} />
          </span>
          <h6 className="text-md lowercase">demandas de serviço</h6>
        </div>
        <hr className="border-1 border-slate-400" />
        <ul className="w-full">
          <small className="text-sm font-extralight lowercase">
            {data
              ? 'minha lista de pedidos'
              : 'ainda não existem pedidos em seu nome'}
          </small>
          {data?.map((order: OrderType) => {
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
                      <div className="relative w-full flex flex-col justify-end">
                        <small className="text-xs text-orange-600 text-right">
                          prazo final
                        </small>
                        <span className="text-xs text-yellow-600 text-end">
                          {moment(order?.deadline).format('lll')}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )
          })}
        </ul>
      </div>
    </div>
  )
}
