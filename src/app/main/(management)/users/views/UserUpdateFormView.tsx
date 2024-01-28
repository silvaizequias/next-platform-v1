'use client'

import { useSession } from 'next-auth/react'
import { UserType } from '../types'
import { UpdateUserDTO, UpdateUserDTOType } from '../dto'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { actionUpdateUser } from '../actions'
import { Button, Checkbox, Radio } from '@material-tailwind/react'

export default function UserUpdateFormView(props: {
  data: UserType
  close: () => void
}) {
  const { data: user, close } = props
  const { data: session } = useSession()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateUserDTOType>({
    resolver: zodResolver(UpdateUserDTO),
    defaultValues: {
      active: user?.active,
      suspended: user?.suspended,
      profile: user?.profile,
      phone: user?.phone,
    },
  })
  const onSubmit: SubmitHandler<UpdateUserDTOType> = async (inputs) => {
    const result = await actionUpdateUser(session!, inputs, user?.id)
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
        label={`perfil ${user?.active ? 'ativo' : 'inativo'} na plataforma`}
        crossOrigin={undefined}
        {...register('active')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.active?.message}
        </span>
      )}

      <Checkbox
        label={`perfil ${
          user?.suspended ? 'desabilitado' : 'habilitado'
        } na plataforma`}
        crossOrigin={undefined}
        {...register('suspended')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.suspended?.message}
        </span>
      )}

      <label htmlFor="userProfile">escolher um perfil</label>
      <select
        {...register('profile')}
        id="userProfile"
        className="block peer w-full rounded"
      >
        <option value={'guest'}>visitante</option>
        <option value={'consumer'}>consumidor</option>
        <option value={'member'}>membro</option>
        <option value={'master'}>master</option>
      </select>
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.profile?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        atualizar usuário
      </Button>
    </form>
  )
}
