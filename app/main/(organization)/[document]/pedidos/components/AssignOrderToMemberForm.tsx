'use client'

import {
  OrderUpdateValidation,
  OrderUpdateValidationType,
} from '@/validations/order'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  onClose: () => void
}

export default function AssignOrderToMemberForm(props: Props) {
  const { onClose } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<OrderUpdateValidationType>({
    resolver: zodResolver(OrderUpdateValidation),
  })

  const onSubmit: SubmitHandler<OrderUpdateValidationType> = async (inputs) => {
    console.log(inputs)
    onClose()
  }

  return (
    <form
      className="relative flex flex-col max-w-lg gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atribuir pedido
      </button>
    </form>
  )
}
