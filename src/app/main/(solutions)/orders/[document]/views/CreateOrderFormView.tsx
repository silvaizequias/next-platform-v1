'use client'

import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateOrderDTO, CreateOrderDTOType } from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { actionCreateOrder } from '../actions'
import toast from 'react-hot-toast'

interface Props {
  organization: OrganizationType
  close: () => void
}

export default function CreateOrderFormView(props: Props) {
  const { organization, close } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrderDTOType>({
    resolver: zodResolver(CreateOrderDTO),
    defaultValues: {
      organization: organization?.document,
    },
  })
  const onSubmit: SubmitHandler<CreateOrderDTOType> = async (inputs) => {
    const result = await actionCreateOrder(
      organization?.apiKey?.authorizationKey,
      inputs,
    )
    if (result?.response?.error) {
      close()
      toast.error(result?.message)
    } else {
      toast.success(result)
      close()
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-2 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        color="light-blue"
        label="organização"
        type="text"
        crossOrigin={undefined}
        {...register('organization')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.organization?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="cliente"
        type="text"
        crossOrigin={undefined}
        {...register('customer')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.customer?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        criar pedido
      </Button>
    </form>
  )
}
