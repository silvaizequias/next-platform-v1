'use client'

import { UpdateProfileDTO, UpdateProfileDTOType } from '@/app/api/profile/dto'
import { UserType } from '@/types/platform-management/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { profileUpdateAction } from '../actions'

interface Props {
  profile: UserType
}

export default function ProfileInformationUpdate(props: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session } = useSession()
  const { profile } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<UpdateProfileDTOType>({
    mode: 'all',
    resolver: zodResolver(UpdateProfileDTO),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      documentCode: profile.documentCode,
    },
  })

  const onSubmit: SubmitHandler<UpdateProfileDTOType> = async (inputs) => {
    try {
      setLoading(true)
      await profileUpdateAction({ data: inputs, session: session! })
        .then((res: any) => {
          if (res.status !== 200) toast.error(res.message)
          toast.success(res.message)
        })
        .catch((error: any) => {
          toast.error(error?.message)
        })
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
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

      <Button
        variant="gradient"
        color="blue"
        size="sm"
        fullWidth
        type="submit"
        disabled={loading}
      >
        {loading ? 'Atualizando as Informações...' : 'Atualizar Informações'}
      </Button>
    </form>
  )
}
