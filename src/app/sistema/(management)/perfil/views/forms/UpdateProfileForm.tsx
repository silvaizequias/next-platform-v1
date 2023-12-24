'use client'

import { UpdateProfileDTO, UpdateProfileDTOType } from '@/app/api/profile/dto'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
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
        if (res.status == 200) {
          await mutate(profile, {
            revalidate: true,
            rollbackOnError: true,
          })
          toast.success(res.text())
        } else {
          toast.error(res.text())
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
      <div className="flex flex-col md:flex-row items-center gap-2 w-auto">
        <div className="w-full">
          <Controller
            {...register('name')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'nome completo'}
                name="name"
                type="text"
                value={value}
                defaultValue={profile?.name}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <Controller
            {...register('documentCode')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'documento'}
                name="documentCode"
                type="text"
                value={value}
                defaultValue={profile?.documentCode}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.documentCode?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 w-auto">
        <div className="w-full">
          <Controller
            {...register('email')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'e-mail'}
                name="email"
                type="text"
                value={value}
                defaultValue={profile?.email}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <Controller
            {...register('phone')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'celular'}
                name="phone"
                type="number"
                value={value}
                defaultValue={profile?.phone}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.phone?.message}
            </span>
          )}
        </div>
      </div>

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Atualizar Informações
      </Button>
    </form>
  )
}
