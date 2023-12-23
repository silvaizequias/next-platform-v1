'use client'

import { UpdateProfileDTO, UpdateProfileDTOType } from '@/app/api/profile/dto'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UpdateProfileForm() {
  const { data: profile, mutate } = useFetch<UserType | any>('/api/profile')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdateProfileDTOType>({
    mode: 'all',
    resolver: zodResolver(UpdateProfileDTO),
  })

  const onSubmit: SubmitHandler<UpdateProfileDTOType> = async (inputs) => {
    try {
      await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...profile, data, {
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

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Atualizar Informações
      </Button>
    </form>
  )
}
