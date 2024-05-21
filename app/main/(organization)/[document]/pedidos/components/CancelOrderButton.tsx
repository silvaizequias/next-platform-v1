'use client'

import { UserType } from '@/types/user'
import { OrderUpdateValidationType } from '@/validations/order'
import { useCallback } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import toast from 'react-hot-toast'
import { updateOrder } from '../actions'

interface Props {
  canceled: boolean
  member: UserType
  orderId: string
}

export default function CancelOrderButton(props: Props) {
  const { canceled, member, orderId } = props

  const handleCancelOrder = useCallback(async () => {
    if (canceled) return null
    const inputs: OrderUpdateValidationType = {
      started: false,
      canceled: true,
      cancellationDate: new Date(),
      cancellationNote: `o pedido foi cancelado por ${member?.name} em ${moment(
        new Date(),
      ).format('lll')}`,
    }
    await updateOrder(orderId, inputs)
      .then(() =>
        toast.success(
          `${member?.name}, você cancelou esse pedido!`,
        ),
      )
      .catch((error: any) =>
        toast.error(error?.message || 'ocorreu um erro inesperado'),
      )
  }, [canceled, orderId, member])

  return !canceled ? (
    <div className="relative">
      <div>
        <button
          onClick={handleCancelOrder}
          type="button"
          className="w-full my-1 py-1 text-slate-50 font-semibold bg-orange-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        >
          cancelar pedido
        </button>
      </div>
    </div>
  ) : null
}
