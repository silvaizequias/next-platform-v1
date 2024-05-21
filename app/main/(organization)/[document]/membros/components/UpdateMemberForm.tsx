import { MemberType } from '@/types/organization'
import {
  MemberUpdateValidation,
  MemberUpdateValidationType,
} from '@/validations/member'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { updateMember } from '../actions'

interface Props {
  member: MemberType | any
  onClose: () => void
}

export default function UpdateMemberForm(props: Props) {
  const { member, onClose } = props

  const params = useParams()
  const { document }: any = params

  const [role, setRole] = useState(member?.role)
  const handleRole = (e: any) => {
    setRole(e.target?.value)
  }

  const [active, setActive] = useState(member?.active)
  const handleActive = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked)
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<MemberUpdateValidationType>({
    resolver: zodResolver(MemberUpdateValidation),
    defaultValues: {
      role: member?.role,
      active: member?.active,
    },
  })
  const onSubmit: SubmitHandler<MemberUpdateValidationType> = async (
    inputs,
  ) => {
    const result = await updateMember(member?.id, {
      ...inputs,
      organizationDocument: document,
    })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      console.log(result)
      toast.success(result)
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
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full">
          <div className="flex items-center space-x-2">
            <input
              id="active"
              className="rounded-md border-none shadow-md text-sky-400/75"
              {...register('active')}
              type="checkbox"
              checked={active}
              onChange={handleActive}
            />
            <label htmlFor="active">
              {active
                ? 'desativar membro na organização'
                : 'ativar membro na organização'}
            </label>
            {errors && (
              <span className="text-xs text-red-400 italic lowercase">
                {errors?.active?.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className="w-full p-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atualizar informações
      </button>
    </form>
  )
}
