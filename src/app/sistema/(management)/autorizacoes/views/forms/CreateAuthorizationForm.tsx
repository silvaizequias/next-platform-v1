'use client'

import {
  CreateAuthorizationDTO,
  CreateAuthorizationDTOType,
} from '@/app/api/authorizations/dto'
import useFetch from '@/hooks/use-fetch'
import { AuthorizationType } from '@/types/authorization'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateAuthorizationForm() {
  const { data: autorizations, mutate } = useFetch<AuthorizationType[] | any>(
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
      await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...autorizations, data, {
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
        {...register('organization')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="organization"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="organização"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.organization?.message}
        </span>
      )}

      <Controller
        {...register('solutionId')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="solutionId"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="solução"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.solutionId?.message}
        </span>
      )}

      <Controller
        {...register('expireIn')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="expireIn"
            type="date"
            //value={value}
            onChange={onChange}
            placeholder="expira em"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.expireIn?.message}
        </span>
      )}

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Criar Autorização
      </Button>
    </form>
  )
}
