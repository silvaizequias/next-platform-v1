'use client'

import { LoginSchema, LoginSchemaType } from '@/schemas/login.schema'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
  onClose: () => void
}

export default function Login(props: Props) {
  const { onClose } = props
  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginSchemaType> = async (inputs) => {
    return await signIn('credentials', {
      redirect: false,
      phone: inputs?.phone,
      password: inputs?.password,
    }).then((res: any) => {
      if (!res.ok) {
        toast.error(res?.error)
      } else {
        toast.success('boas vindas a dedicado')
        onClose()
        router.refresh()
      }
    })
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="w-full rounded-md"
        {...register('phone')}
        type="number"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.phone?.message}
        </span>
      )}
      <input
        className="w-full rounded-md"
        {...register('password')}
        type="password"
      />
      {errors && (
        <span className="text-xs text-red-400 italic lowercase">
          {errors?.password?.message}
        </span>
      )}
      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        autenticar-se
      </button>
    </form>
  )
}
