'use client'

import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  CreateOrganizationUserDTO,
  CreateOrganizationUserDTOType,
} from '../../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { actionCreateMyOrganizationUser } from '../../actions'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'

export default function MyOrganizationUserFormView({
  close,
}: {
  close: () => void
}) {
  const { data: session } = useSession()
  const params = useParams()
  const { document }: any = params

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrganizationUserDTOType>({
    resolver: zodResolver(CreateOrganizationUserDTO),
  })
  const onSubmit: SubmitHandler<CreateOrganizationUserDTOType> = async (
    inputs,
  ) => {
    const result = await actionCreateMyOrganizationUser(session!, {
      ...inputs,
      organizationDocument: document,
    })
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

      <Input
        color="light-blue"
        label="celular do usuário"
        type="number"
        crossOrigin={undefined}
        {...register('userPhone')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.userPhone?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        adicionar usuário
      </Button>
    </form>
  )
}
