'use client'

import {
  CreateSupportCategoryDTO,
  CreateSupportCategoryDTOType,
} from '@/app/api/support-management/categories/dto'
import useFetch from '@/hooks/use-fetch'
import { SupportCategoryType } from '@/types/support-management/category'
import { zodResolver } from '@hookform/resolvers/zod'
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
      className="flex flex-col flex-1 gap-4 m-2 sm:min-w-[320px]"
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
            placeholder={'nome para a categoria'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.name?.message}
        </span>
      )}

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
            placeholder={'breve descrição'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.description?.message}
        </span>
      )}

      <button
        className="mt-2 w-full uppercase rounded-md bg-sky-600 hover:opacity-75 py-2 text-white text-base hover:font-medium"
        type="submit"
      >
        Adicionar Categoria
      </button>
    </form>
  )
}
