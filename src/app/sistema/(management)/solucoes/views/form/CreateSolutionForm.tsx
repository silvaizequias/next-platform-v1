'use client'

import {
  CreateSolutionDTO,
  CreateSolutionDTOType,
} from '@/app/api/solutions/dto'
import useFetch from '@/hooks/use-fetch'
import { SolutionType } from '@/types/solution'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateSolutionForm() {
  const { data: solutions, mutate } = useFetch<SolutionType[] | any>(
    '/api/solutions',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateSolutionDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateSolutionDTO),
  })

  const onSubmit: SubmitHandler<CreateSolutionDTOType> = async (inputs) => {
    try {
      await fetch(`/api/solutions`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...solutions, data, {
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

      <Controller
        {...register('description')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="description"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('apiUrl')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="apiUrl" type="date" value={value} onChange={onChange} />
        )}
      />

      <button className="w-full uppercase" type="submit">
        Criar Solução
      </button>
    </form>
  )
}
