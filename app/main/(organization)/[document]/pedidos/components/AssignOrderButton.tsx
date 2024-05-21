'use client'

import { UserType } from '@/types/user'
import { OrderUpdateValidationType } from '@/validations/order'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { updateOrder } from '../actions'

interface Props {
  member: UserType
  orderId: string
}

export default function AssignOrderButton(props: Props) {
  const { member, orderId } = props

  const handleAssignOrder = useCallback(async () => {
    const inputs: OrderUpdateValidationType = {
      member: member?.phone,
    }
    await updateOrder(orderId, inputs)
      .then(() => {
        toast.success(`${member?.name}, você aceitou atender este pedido`)
      })
      .catch((error: any) =>
        toast.error(error?.message || 'ocorreu um erro inesperado'),
      )
  }, [member, orderId])

  return member ? (
    <div className="relative">
      <div>
        <button
          onClick={handleAssignOrder}
          type="button"
          className="w-full my-1 py-1 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        >
          aceitar pedido
        </button>
      </div>
    </div>
  ) : null
}
