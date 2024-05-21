'use client'

import { LoginValidation, LoginValidationType } from '@/validations/login'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import useCountries from 'use-countries'
import { codeCountries } from '@/helpers'

interface Props {
  onClose?: () => void
}

export default function Login(props: Props) {
  const { onClose } = props
  const router = useRouter()
  const { countries } = useCountries()

  const limitCountries = countries.filter((country) =>
    codeCountries.includes(country.code),
  )

  const [country, setCountry] = useState(limitCountries[1].phone)
  const handleCountry = (e: any) => {
    setCountry(e.target?.value)
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
  })

  const onSubmit: SubmitHandler<LoginValidationType> = async (inputs) => {
    const phone: string = inputs?.phoneCountry + inputs?.phone

    return await signIn('credentials', {
      redirect: false,
      phone: phone,
      password: inputs?.password,
    })
      .then((res: any) => {
        if (!res.ok) {
          toast.error(res?.error)
        } else {
          toast.success('boas vindas a sua melhor plataforma de serviços')
          onClose && onClose()
          router.refresh()
        }
      })
      .finally(() => reset())
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2">
        <div className="relative sm:w-2/3">
          <label
            htmlFor="phoneCountry"
            className="dark:text-slate-400 font-thin"
          >
            país
          </label>
          <select
            {...register('phoneCountry')}
            value={country}
            onChange={handleCountry}
            className="w-full rounded-md"
          >
            {limitCountries.map((item) => (
              <option key={item.native} value={item.phone}>
                {item.emoji + ' ' + item.phone}
              </option>
            ))}
          </select>
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.phoneCountry?.message}
            </span>
          )}
        </div>
        <div className="relative w-full">
          <label htmlFor="loginPhone" className="dark:text-slate-400 font-thin">
            celular
          </label>
          <input
            {...register('phone')}
            id="loginPhone"
            className="w-full rounded-md"
            type="number"
            placeholder="48 98765 4321"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.phone?.message}
            </span>
          )}
        </div>
      </div>
      <div className="relative w-full">
        <label htmlFor="password" className="dark:text-slate-400 font-thin">
          senha
        </label>
        <input
          id="password"
          className="w-full rounded-md"
          {...register('password')}
          type="password"
          placeholder="s*e*n*h*a"
        />
        {errors && (
          <span className="text-xs text-red-400 italic lowercase">
            {errors?.password?.message}
          </span>
        )}
      </div>

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        autenticar-se
      </button>

      <div className="w-full flex justify-center">
        <span className="text-center text-xs dark:text-slate-400 font-thin">
          ou
        </span>
      </div>

      <a
        href="/registrar-se"
        className="w-full flex justify-center py-2 my-2 text-slate-50 font-semibold bg-green-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="button"
      >
        registrar-se
      </a>
    </form>
  )
}
