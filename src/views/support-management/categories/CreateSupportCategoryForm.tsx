'use client'

import {
  CreateSupportCategoryDTO,
  CreateSupportCategoryDTOType,
} from '@/app/api/support-management/categories/dto'
import useFetch from '@/hooks/use-fetch'
import { SupportCategoryType } from '@/types/support-management/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@mui/base'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateSupportCategoryForm() {
  const { data: supportCategories, mutate } = useFetch<
    SupportCategoryType[] | any
  >('/api/support-management/categories')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateSupportCategoryDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateSupportCategoryDTO),
  })

  const onSubmit: SubmitHandler<CreateSupportCategoryDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/support-management/categories`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...supportCategories, data, {
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
          <Input name="name" type="type" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('description')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            name="description"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button color="primary" className="w-full uppercase" type="submit">
        Adicionar Categoria
      </Button>
    </form>
  )
}
