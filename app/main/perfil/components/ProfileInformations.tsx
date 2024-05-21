'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  ProfileUpdateValidation,
  ProfileUpdateValidationType,
} from '@/validations/profile'
import { updateProfile } from '../actions'
import { usePlatform } from '@/contexts/PlatformContext'

export default function ProfileInformations() {
  const { user }: any = usePlatform()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileUpdateValidationType>({
    resolver: zodResolver(ProfileUpdateValidation),
    defaultValues: {
      name: user?.name,
      document: user?.document,
      phone: user?.phone,
      email: user?.email,
    },
  })
  const onSubmit: SubmitHandler<ProfileUpdateValidationType> = async (
    inputs,
  ) => {
    await updateProfile(inputs)
      .then((data: any) => {
        if (data?.response?.error) {
          toast.error(data?.message)
        } else {
          toast.success(data)
        }
      })
      .catch((error: any) => {
        toast.error(error?.message)
      })
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <label htmlFor="name">nome</label>
          <input
            id="name"
            className="w-full rounded-md"
            {...register('name')}
            type="text"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.name?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full sm:w-2/3">
          <label htmlFor="email">e-mail</label>
          <input
            id="email"
            className="w-full rounded-md"
            {...register('email')}
            type="email"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.email?.message}
            </span>
          )}
        </div>
        <div className="relative w-full sm:w-1/3">
          <label htmlFor="phone">telefone</label>
          <input
            id="phone"
            className="w-full rounded-md bg-slate-200/50 border-0"
            {...register('phone')}
            type="number"
            disabled
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.phone?.message}
            </span>
          )}
        </div>
        <div className="relative w-full sm:w-1/3">
          <label htmlFor="document">documento</label>
          <input
            id="document"
            className="w-full rounded-md"
            {...register('document')}
            type="number"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.document?.message}
            </span>
          )}
        </div>
      </div>

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atualizar informações
      </button>
    </form>
  )
}
