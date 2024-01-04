'use client'

import {
  UpdateProfileAddressDTO,
  UpdateProfileAddressDTOType,
} from '@/app/api/profile/dto'
import { UserType } from '@/types/platform-management/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { profileUpdateAction } from '../actions'
import { useSession } from 'next-auth/react'

interface Props {
  profile: UserType
}

export default function ProfileAddressUpdate(props: Props) {
  const { profile } = props
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm<UpdateProfileAddressDTOType>({
    mode: 'all',
    resolver: zodResolver(UpdateProfileAddressDTO),
    defaultValues: {
      zipCode: profile?.zipCode,
      street: profile?.street,
      district: profile?.district,
      city: profile?.city,
      state: profile?.state,
    },
  })

  const onSubmit: SubmitHandler<UpdateProfileAddressDTOType> = async (
    inputs,
  ) => {
    setLoading(true)
    try {
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
      reset(inputs)
    }
  }

  const setZipCode = async (event: { target: { value: any } }) => {
    const zipCode = event.target.value?.replace(/[^0-9]/g, '')
    try {
      if (zipCode) {
        await fetch(`https://viacep.com.br/ws/${zipCode}/json/`, {
          method: 'GET',
        })
          .then(async (res: any) => {
            const data = await res.json()
            if (!data?.cep!) {
              toast.error(`CEP ${zipCode} inválido!`)
            }
            setValue('street', data?.logradouro)
            setValue('complement', data?.complemento)
            setValue('district', data?.bairro)
            setValue('city', data?.localidade)
            setValue('state', data?.uf)
          })
          .catch((error: any) => {
            toast.error(error?.response?.data || error?.message)
          })
      }
    } catch (error: any) {
      toast.error(error?.response?.data || error?.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <div className="flex flex-col md:flex-row items-center gap-2 w-auto">
        <div className="w-full md:w-auto">
          <Controller
            {...register('zipCode')}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'cep'}
                name="zipCode"
                type="number"
                value={value}
                onBlur={setZipCode}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.zipCode?.message}
            </span>
          )}
        </div>
        <div className="w-full md:w-4/5">
          <Controller
            {...register('street')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'logradouro'}
                name="street"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.street?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Controller
          {...register('complement')}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              crossOrigin={undefined}
              color="blue"
              size="md"
              label={'complemento'}
              name="complement"
              type="text"
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors && (
          <span className="text-red-400 text-xs font-thin italic lowercase">
            {errors.complement?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 w-auto">
        <div className="w-full">
          <Controller
            {...register('district')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'bairro'}
                name="district"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.district?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <Controller
            {...register('city')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'cidade'}
                name="city"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.city?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <Controller
            {...register('state')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="blue"
                size="md"
                label={'estado'}
                name="state"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.state?.message}
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
        {loading ? 'Atualizando Endereço...' : 'Atualizar Endereço'}
      </Button>
    </form>
  )
}
