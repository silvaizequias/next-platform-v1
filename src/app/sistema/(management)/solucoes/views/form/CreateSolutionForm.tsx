'use client'

import {
  CreateSolutionDTO,
  CreateSolutionDTOType,
} from '@/app/api/solutions/dto'
import useFetch from '@/hooks/use-fetch'
import { SolutionType } from '@/types/solution'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
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
          <input
            className="rounded-md"
            name="name"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'nome'}
          />
        )}
      />

      <Controller
        {...register('description')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="description"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'descrição'}
          />
        )}
      />

      <Controller
        {...register('apiUrl')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="apiUrl"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'https://...'}
          />
        )}
      />

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Criar Solução
      </Button>
    </form>
  )
}
