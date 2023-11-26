'use client'

import { AuthSignUpDTO, AuthSignUpDTOType } from '@/dto/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
  const router = useRouter()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthSignUpDTOType>({
    mode: 'all',
    resolver: zodResolver(AuthSignUpDTO),
  })

  const onSubmit: SubmitHandler<AuthSignUpDTOType> = async (inputs) => {
    try {
      await fetch('/api/sign-up', {
        method: 'POST',
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          phone: inputs.phone,
          password: randomCode,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(res?.json())
        toast.success(`boas vindas a DEDICADO ${inputs?.name}`)

        await signIn('credentials', {
          redirect: false,
          email: inputs.email,
          password: randomCode,
        }).then(async (res: any) => {
          if (!res?.error) {
            router.refresh()
          } else {
            toast.error(res?.error)
          }
        })
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
      console.error(error)
    } finally {
      reset
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
