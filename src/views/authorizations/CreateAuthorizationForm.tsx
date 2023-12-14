'use client'

import {
  CreateAuthorizationDTO,
  CreateAuthorizationDTOType,
} from '@/app/api/authorizations/dto'
import useFetch from '@/hooks/use-fetch'
import { AuthorizationType } from '@/types/authorization'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@mui/base'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateAuthorizationForm() {
  const { data: authorizations, mutate } = useFetch<AuthorizationType[] | any>(
    '/api/authorizations',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateAuthorizationDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateAuthorizationDTO),
  })

  const onSubmit: SubmitHandler<CreateAuthorizationDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/authorizations`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...authorizations, data, {
            revalidate: true,
            rollbackOnError: true,
          })

          toast.success(data)
        } else {
          toast.error(data)
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    } finally {
      reset(inputs)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <Controller
        {...register('solution')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            name="solution"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('organization')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            name="organization"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('role')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input name="role" type="text" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('expireIn')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            name="expireIn"
            type="date"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button color="primary" className="w-full uppercase" type="submit">
        Criar Chave de Autorização
      </Button>
    </form>
  )
}
