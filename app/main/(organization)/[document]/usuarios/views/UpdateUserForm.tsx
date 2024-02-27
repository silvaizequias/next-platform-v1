import {
  UpdateOrganizationUserSchemaType,
  UpdateOrganizationUserSchema,
} from '@/schemas/organization-user'
import { OrganizationUserType } from '@/types/organization-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { update } from '../actions'

interface Props {
  data: OrganizationUserType | any
  onClose: () => void
}

export default function UpdateUserForm(props: Props) {
  const { data, onClose } = props

  const params = useParams()
  const { document }: any = params

  const [role, setRole] = useState(data?.role)
  const handleRole = (e: any) => {
    setRole(e.target?.value)
  }

  const [active, setActive] = useState(data?.active)
  const handleActive = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked)
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationUserSchemaType>({
    resolver: zodResolver(UpdateOrganizationUserSchema),
    defaultValues: {
      role: data?.role,
      active: data?.active,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrganizationUserSchemaType> = async (
    inputs,
  ) => {
    const result = await update(data?.id, inputs, document)
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
            ? 'desativar usuário na organização'
            : 'ativar usuário na organização'}
        </label>
        {errors && (
          <span className="text-xs text-red-400 italic lowercase">
            {errors?.active?.message}
          </span>
        )}
      </div>

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atualizar informações
      </button>
    </form>
  )
}
