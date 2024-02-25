'use client'

import {
  CreateOrganizationUserSchemaType,
  CreateOrganizationUserSchema,
} from '@/schemas/organization-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { create } from '../actions'

interface Props {
  onClose: () => void
}

export default function CreateUserForm(props: Props) {
  const { onClose } = props

  const params = useParams()
  const { document }: any = params

  const [role, setRole] = useState<
    'client' | 'assistant' | 'technician' | 'administrator' | 'owner'
  >('client')
  const handleRole = (e: any) => {
    setRole(e.target?.value)
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateOrganizationUserSchemaType>({
    resolver: zodResolver(CreateOrganizationUserSchema),
    defaultValues: {
      organizationDocument: document!,
    },
  })
  const onSubmit: SubmitHandler<CreateOrganizationUserSchemaType> = async (
    inputs,
  ) => {
    const result = await create(inputs)
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
      <label htmlFor="userPhone">celular do usuário</label>
      <input
        id="userPhone"
        className="w-full rounded-md"
        {...register('userPhone')}
        type="number"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.userPhone?.message}
        </span>
      )}

      <label htmlFor="role">função do usuário na organização</label>
      <select
        id="role"
        className="w-full rounded-md"
        {...register('role')}
        value={role}
        onChange={handleRole}
      >
        <option value={'client'}>cliente</option>
        <option value={'assistant'}>assistente</option>
        <option value={'technician'}>técnico</option>
        <option value={'administrator'}>administrador</option>
        <option value={'owner'}>proprietário</option>
      </select>
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.role?.message}
        </span>
      )}

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        adicionar usuário na organização
      </button>
    </form>
  )
}
