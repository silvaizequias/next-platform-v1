'use client'

import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  UpdateOrganizationUserDTO,
  UpdateOrganizationUserDTOType,
} from '../../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input } from '@material-tailwind/react'
import { actionUpdateMyOrganizationUser } from '../actions'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'
import { OrganizationUsersType } from '../../types'

export default function UpdateOrganizationUserFormView({
  close,
  data,
}: {
  close: () => void
  data: OrganizationUsersType
}) {
  const { data: session } = useSession()
  const params = useParams()
  const { document }: any = params

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationUserDTOType>({
    resolver: zodResolver(UpdateOrganizationUserDTO),
    defaultValues: {
      active: data?.active,
      role: data?.role,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrganizationUserDTOType> = async (
    inputs,
  ) => {
    const result = await actionUpdateMyOrganizationUser(
      session!,
      {
        ...inputs,
        organizationDocument: document,
      },
      data?.id,
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
      className="w-full flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Checkbox
        label={`membro ${data?.active ? 'ativo' : 'inativo'} na organização`}
        crossOrigin={undefined}
        {...register('active')}
      />

      <label htmlFor="role">escolher uma função</label>
      <select
        {...register('role')}
        id="role"
        className="block peer w-full rounded"
      >
        <option value={'client'}>cliente</option>
        <option value={'assistant'}>assistente</option>
        <option value={'technician'}>técnico</option>
        <option value={'administrator'}>administrador</option>
      </select>

      <Button color="light-blue" type="submit">
        atualizar usuário
      </Button>
    </form>
  )
}
