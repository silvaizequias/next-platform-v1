'use client'

import {
  MemberCreateValidation,
  MemberCreateValidationType,
} from '@/validations/member'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createMember } from '../actions'

interface Props {
  onClose: () => void
}

export default function CreateMemberForm(props: Props) {
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
  } = useForm<MemberCreateValidationType>({
    resolver: zodResolver(MemberCreateValidation),
    defaultValues: {
      organizationDocument: document!,
    },
  })
  const onSubmit: SubmitHandler<MemberCreateValidationType> = async (
    inputs,
  ) => {
    const result = await createMember(inputs)
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
      className="flex flex-col max-w-md gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full">
          <label htmlFor="userPhone">telefone do membro</label>
          <input
            id="userPhone"
            className="w-full rounded-md"
            {...register('userPhone')}
            type="number"
            placeholder='55 48 98765 4321'
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.userPhone?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full">
          <label htmlFor="role">função do membro na organização</label>
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
        </div>
      </div>

      <button
        className="w-full p-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        adicionar membro na organização
      </button>
    </form>
  )
}
