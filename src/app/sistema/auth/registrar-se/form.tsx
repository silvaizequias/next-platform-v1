'use client'

import {
  SignUpDTO,
  SignUpDTOType,
} from '@/app/api/platform-management/signup/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
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
        if (res.status == 200) {
          await signIn('credentials', {
            redirect: false,
            email: inputs.email,
            password: randomCode,
          }).then(async (res: any) => {
            if (!res.error) {
              toast.success(`boas vindas a portal dedicado ${inputs.name}`)
              router.refresh()
            } else {
              toast.error(res.error)
            }
          })
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
      className="flex flex-col flex-1 gap-2 m-2"
    >
      <Controller
        {...register('name')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
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

      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'e-mail'}
            name="email"
            type="email"
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

      <Controller
        {...register('phone')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
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

      <Button
        variant="gradient"
        color="green"
        size="sm"
        fullWidth
        type="submit"
      >
        Registrar-se
      </Button>
    </form>
  )
}
