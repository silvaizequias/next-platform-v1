'use client'

import { Button, Checkbox } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateOrganizationKeyDTO, UpdateOrganizationKeyDTOType } from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { actionUpdateOrganizationKeys } from '../actions'
import toast from 'react-hot-toast'
import { OrganizationKeyType } from '../types'

export default function AuthorizationUpdateFormView({
  close,
  data,
}: {
  close: () => void
  data: OrganizationKeyType
}) {
  const { data: session } = useSession()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationKeyDTOType>({
    resolver: zodResolver(UpdateOrganizationKeyDTO),
    defaultValues: {
      active: data?.active,
      //expireIn: data?.expireIn,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrganizationKeyDTOType> = async (
    inputs,
  ) => {
    const result = await actionUpdateOrganizationKeys(
      session!,
      inputs,
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
      className="w-full flex flex-col gap-2 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Checkbox
        label={`chave ${data?.active ? 'ativa' : 'inativa'} na plataforma`}
        crossOrigin={undefined}
        {...register('active')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.active?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        atualizar chave de autorização
      </Button>
    </form>
  )
}
