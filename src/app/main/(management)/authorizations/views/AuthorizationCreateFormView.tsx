'use client'

import { Button, Input } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateOrganizationKeyDTO, CreateOrganizationKeyDTOType } from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { actionCreateOrganizationKeys } from '../actions'
import toast from 'react-hot-toast'

export default function AuthorizationCreateFormView({
  close,
}: {
  close: () => void
}) {
  const { data: session } = useSession()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrganizationKeyDTOType>({
    resolver: zodResolver(CreateOrganizationKeyDTO),
  })
  const onSubmit: SubmitHandler<CreateOrganizationKeyDTOType> = async (
    inputs,
  ) => {
    const result = await actionCreateOrganizationKeys(session!, inputs)
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
        label="documento"
        type="text"
        crossOrigin={undefined}
        {...register('organizationDocument')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.organizationDocument?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        criar chave de autorização
      </Button>
    </form>
  )
}
