'use client'

import { UpdateOrderSchemaType, UpdateOrderSchema } from '@/schemas/order'
import { OrderType } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import moment from 'moment'

interface Props {
  authorizationKey: string
  data: OrderType | any
  onClose: () => void
}

export default function UpdateOrderForm(props: Props) {
  const { authorizationKey, data, onClose } = props

  const params = useParams()
  const { document }: any = params

  const [deadline, setDeadline] = useState(moment(data?.deadline).format('L'))
  const handleDeadline = (e: any) => {
    setDeadline(moment(e.target?.value).format('L'))
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UpdateOrderSchemaType>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      organization: document!,
      deadline: data?.deadline,
      member: data?.member,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrderSchemaType> = async (inputs) => {
    console.log(inputs)
    reset()
    onClose()
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="deadline">prazo limite para atendimento</label>
      <input
        id="deadline"
        className="w-full rounded-md"
        {...register('deadline')}
        type="datetime-local"
        value={deadline}
        onChange={handleDeadline}
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.deadline?.message}
        </span>
      )}

      <label htmlFor="member">membro responsável</label>
      <input
        id="member"
        className="w-full rounded-md"
        {...register('member')}
        type="number"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.member?.message}
        </span>
      )}

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atualizar pedido
      </button>
    </form>
  )
}
