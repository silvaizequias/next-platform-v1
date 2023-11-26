'use client'

import { AuthSignInDTO, AuthSignInDTOType } from '@/dto/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthSignInDTOType>({
    mode: 'all',
    resolver: zodResolver(AuthSignInDTO),
  })

  const onSubmit: SubmitHandler<AuthSignInDTOType> = async (inputs) => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: inputs?.email,
        password: inputs?.password,
      }).then(async (res: any) => {
        if (!res?.error) {
          router.refresh()
        } else {
          toast.error(res?.error)
        }
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
