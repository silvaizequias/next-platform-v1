'use client'

import { UserType } from '@/types/user'
import { OrderUpdateValidationType } from '@/validations/order'
import { useCallback } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { updateOrder } from '../actions'
import toast from 'react-hot-toast'

interface Props {
  canceled: boolean
  member: UserType
  orderId: string
  started: boolean
}

export default function CompleteOrderButton(props: Props) {
  const { canceled, member, orderId, started } = props

  const handleCompleteOrder = useCallback(async () => {
    const inputs: OrderUpdateValidationType = {
      latitude: member?.latitude,
      longitude: member?.longitude,
      started: false,
      completed: true,
      completionDate: new Date(),
      completionNote: `o pedido foi concluído por ${member?.name} em ${moment(
        new Date(),
      ).format('lll')}`,
    }
    await updateOrder(orderId, inputs)
      .then(() =>
        toast.success(
          `${member?.name}, você concluiu o atendimento desse pedido!`,
        ),
      )
      .catch((error: any) =>
        toast.error(error?.message || 'ocorreu um erro inesperado'),
      )
  }, [member, orderId])

  return started || canceled ? (
    <div className="relative">
      <div>
        <button
          onClick={handleCompleteOrder}
          type="button"
          className="w-full my-1 py-1 text-slate-50 font-semibold bg-blue-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        >
          concluir pedido
        </button>
      </div>
    </div>
  ) : null
}
