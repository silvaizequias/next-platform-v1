'use client'

import { CreateOrderSchemaType, CreateOrderSchema } from '@/schemas/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { actionCreateOrder } from '../actions'

interface Props {
  onClose: () => void
  authorizationKey: string
}

export default function CreateOrderForm(props: Props) {
  const { onClose, authorizationKey } = props

  const params = useParams()
  const { document }: any = params

  const [requirement, setRequirement] = useState<
    'pick-up' | 'deliver' | 'charge' | 'perform' | 'support'
  >('deliver')
  const handleRequirement = (e: any) => {
    setRequirement(e.target?.value)
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateOrderSchemaType>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      organization: document!,
    },
  })
  const onSubmit: SubmitHandler<CreateOrderSchemaType> = async (inputs) => {
    const result = await actionCreateOrder(inputs, authorizationKey)
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      reset()
      onClose()
    }
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="requirement">necessidade</label>
      <select
        id="requirement"
        className="w-full rounded-md"
        {...register('requirement')}
        value={requirement}
        onChange={handleRequirement}
      >
        <option value={'pick-up'}>coletar</option>
        <option value={'deliver'}>entregar</option>
        <option value={'charge'}>cobrar</option>
        <option value={'perform'}>executar</option>
      </select>
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.requirement?.message}
        </span>
      )}

      <label htmlFor="customer">cliente</label>
      <input
        id="customer"
        className="w-full rounded-md"
        {...register('customer')}
        type="number"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.customer?.message}
        </span>
      )}

      <label htmlFor="subject">assunto</label>
      <input
        id="subject"
        className="w-full rounded-md"
        {...register('subject')}
        type="text"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.subject?.message}
        </span>
      )}

      <label htmlFor="observation">observação</label>
      <textarea
        id="observation"
        className="w-full rounded-md"
        {...register('observation')}
        rows={4}
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.observation?.message}
        </span>
      )}

      <label htmlFor="deadline">prazo limite para atendimento</label>
      <input
        id="deadline"
        className="w-full rounded-md"
        {...register('deadline')}
        type="datetime-local"
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
        criar pedido
      </button>
    </form>
  )
}
