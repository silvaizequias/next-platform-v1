'use client'

import { RegisterSchema, RegisterSchemaType } from '@/schemas/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { actionRegister } from '../actions'
import { signIn } from 'next-auth/react'

export default function RegisterForm() {
  const randomCode = Math.random().toString(32).substr(2, 16)

  const [accept, setAccept] = useState<boolean>(false)
  const handleAccept = (event: ChangeEvent<HTMLInputElement>) => {
    setAccept(event.target.checked)
  }

  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (inputs) => {
    const result = await actionRegister({ ...inputs, password: randomCode })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      await signIn('credentials', {
        redirect: false,
        phone: inputs?.phone,
        password: randomCode,
      }).then((res: any) => {
        if (!res.ok) {
          toast.error(res?.error)
        } else {
          toast.success(`boas vindas a dedicado ${inputs?.name}`)
          router.refresh()
        }
      })
    }
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <label htmlFor="name" className="dark:text-sky-600">
            nome completo
          </label>
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
          <label htmlFor="email" className="dark:text-sky-600">
            e-mail
          </label>
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
          <label htmlFor="registerPhone" className="dark:text-sky-600">
            celular
          </label>
          <input
            id="registerPhone"
            className="w-full rounded-md"
            {...register('phone')}
            type="number"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.phone?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <small className="py-4 text-center text-xs italic lowercase font-thin">
          uma senha será definida automaticamente e você a receberá por e-mail
          ou em seu dispositivo móvel
        </small>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-2">
        <div className="flex items-center space-x-2">
          <a
            href="/termos-e-politicas"
            target="_blank"
            className="text-xs lowercase font-semibold"
          >
            aceito os termos e políticas
          </a>
          <input
            id="active"
            className="rounded-md border-none border-0 border-inherit shadow-md text-green-400/75"
            type="checkbox"
            checked={accept}
            onChange={handleAccept}
          />
        </div>
      </div>
      <button
        className={`w-full py-2 my-2 text-slate-50 font-semibold ${
          accept
            ? 'bg-green-600/75 hover:opacity-80 hover:shadow-md'
            : 'bg-green-600/75 opacity-50'
        } rounded-md `}
        type="submit"
        disabled={!accept}
      >
        registrar-se
      </button>
    </form>
  )
}
