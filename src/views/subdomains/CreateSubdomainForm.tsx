'use client'

import {
  CreateSubdomainDTO,
  CreateSubdomainDTOType,
} from '@/app/api/subdomains/dto'
import useFetch from '@/hooks/use-fetch'
import { SubdomainType } from '@/types/subdomain'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateSubdomainForm() {
  const { data: subdomains, mutate } = useFetch<SubdomainType[] | any>(
    '/api/subdomains',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateSubdomainDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateSubdomainDTO),
  })

  const onSubmit: SubmitHandler<CreateSubdomainDTOType> = async (inputs) => {
    try {
      await fetch(`/api/subdomains`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...subdomains, data, {
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
        {...register('name')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="name" type="text" value={value} onChange={onChange} />
        )}
      />

      <button className="w-full uppercase" type="submit">
        Criar Subdomínio
      </button>
    </form>
  )
}
