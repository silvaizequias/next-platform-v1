'use client'

import {
  SignUpDTO,
  SignUpDTOType,
} from '@/app/api/platform-management/signup/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SignUpForm() {
  const router = useRouter()
  const randomCode = Math.random().toString(32).substr(2, 14)

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SignUpDTOType>({ mode: 'all', resolver: zodResolver(SignUpDTO) })

  const onSubmit: SubmitHandler<SignUpDTOType> = async (inputs) => {
    const data: SignUpDTOType = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      password: randomCode,
    }

    try {
      await fetch(`/api/platform-management/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          reset(inputs)

          await signIn('credentials', {
            redirect: false,
            email: inputs.email,
            password: randomCode,
          }).then(async (res: any) => {
            if (!res.error) {
              toast.success(`olá ${inputs.name}`)
              router.refresh()
            } else {
              toast.error(res.error)
            }
          })
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
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="email" type="email" value={value} onChange={onChange} />
        )}
      />
      <Controller
        {...register('phone')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="phone" type="number" value={value} onChange={onChange} />
        )}
      />

      <button className="w-full uppercase" type="submit">
        Registrar-se
      </button>
    </form>
  )
}
