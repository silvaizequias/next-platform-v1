'use client'

import {
  UpdateOrganizationSchemaType,
  UpdateOrganizationSchema,
} from '@/schemas/organization'
import { OrganizationType } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { update } from '../actions'

interface Props {
  data: OrganizationType | any
  onClose: () => void
}

export default function UpdateOrganizationForm(props: Props) {
  const { data, onClose } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationSchemaType>({
    resolver: zodResolver(UpdateOrganizationSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      zipCode: data?.zipCode,
      street: data?.street,
      complement: data?.complement,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrganizationSchemaType> = async (
    inputs,
  ) => {
    const result = await update(data?.id, inputs)
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      onClose()
    }
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="name">nome</label>
      <input
        id="name"
        className="w-full rounded-md"
        {...register('name')}
        type="text"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.name?.message}
        </span>
      )}

      <label htmlFor="email">e-mail</label>
      <input
        id="email"
        className="w-full rounded-md"
        {...register('email')}
        type="email"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.email?.message}
        </span>
      )}

      <label htmlFor="phone">telefone</label>
      <input
        id="phone"
        className="w-full rounded-md"
        {...register('phone')}
        type="number"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.phone?.message}
        </span>
      )}

      <label htmlFor="zipCode">cep</label>
      <input
        className="w-full rounded-md"
        {...register('zipCode')}
        type="number"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.zipCode?.message}
        </span>
      )}

      <label htmlFor="street">logradouro</label>
      <input
        id="street"
        className="w-full rounded-md"
        {...register('street')}
        type="text"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.street?.message}
        </span>
      )}

      <label htmlFor="complement">complemento</label>
      <input
        id="complement"
        className="w-full rounded-md"
        {...register('complement')}
        type="text"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.complement?.message}
        </span>
      )}

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atualizar informações
      </button>
    </form>
  )
}
