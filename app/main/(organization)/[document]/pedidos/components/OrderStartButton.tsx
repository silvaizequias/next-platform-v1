'use client'

import { UserType } from '@/types/user'
import { OrderUpdateValidationType } from '@/validations/order'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import moment from 'moment'
import 'moment/locale/pt-br'
import { updateOrder } from '../actions'

interface Props {
  member: UserType
  orderId: string
  started: boolean
}

export default function OrderStartButton(props: Props) {
  const { member, orderId, started } = props

  const handleStartOrder = useCallback(async () => {
    if (started) return null
    const inputs: OrderUpdateValidationType = {
      longitude: member?.longitude,
      latitude: member?.latitude,
      started: true,
      startDate: new Date(),
      startNote: `o pedido foi iniciado por ${member?.name} em ${moment(
        new Date(),
      ).format('lll')}`,
    }
    await updateOrder(orderId, inputs)
      .then(() =>
        toast.success(
          `${member?.name}, você iniciou o atendimento desse pedido!`,
        ),
      )
      .catch((error: any) =>
        toast.error(error?.message || 'ocorreu um erro inesperado'),
      )
  }, [member, orderId, started])

  return !started ? (
    <div className="relative">
      <div>
        <button
          onClick={handleStartOrder}
          type="button"
          className="w-full my-1 py-1 text-slate-50 font-semibold bg-green-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        >
          iniciar atendimento
        </button>
      </div>
    </div>
  ) : null
}
