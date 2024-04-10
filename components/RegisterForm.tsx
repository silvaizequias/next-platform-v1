'use client'

import { codeCountries } from '@/helpers'
import {
  RegisterValidation,
  RegisterValidationType,
} from '@/validations/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useCountries from 'use-countries'

export default function RegisterForm() {
  const randomCode = Math.random().toString(32).substr(2, 16)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  const [accept, setAccept] = useState<boolean>(false)
  const handleAccept = (event: ChangeEvent<HTMLInputElement>) => {
    setAccept(event.target.checked)
  }

  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<RegisterValidationType>({
    resolver: zodResolver(RegisterValidation),
  })
  const { countries } = useCountries()

  const limitCountries = countries.filter((country) =>
    codeCountries.includes(country.code),
  )

  const [country, setCountry] = useState(limitCountries[1].phone)
  const handleCountry = (e: any) => {
    setCountry(e.target?.value)
  }

  const onSubmit: SubmitHandler<RegisterValidationType> = async (inputs) => {
    const phone = inputs?.phoneCountry + inputs?.phone
    const password = randomCode
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="relative p-2 flex flex-col gap-2"
    >
      <div className="w-full">
        <label htmlFor="name" className="dark:text-slate-400 font-thin">
          nome completo
        </label>
        <input
          id="name"
          className="w-full rounded-md"
          {...register('name')}
          type="text"
          placeholder="seu nome completo"
        />
        {errors && (
          <span className="text-xs text-red-400 italic lowercase">
            {errors?.name?.message}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <div className="sm:w-2/3">
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
        <div className="w-full">
          <label htmlFor="phone" className="dark:text-slate-400 font-thin">
            celular
          </label>
          <input
            {...register('phone')}
            id="phone"
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
      <div className="w-full">
        <label htmlFor="email" className="dark:text-sky-600">
          e-mail
        </label>
        <input
          id="email"
          className="w-full rounded-md"
          {...register('email')}
          type="email"
          placeholder="seu@email.com"
        />
        {errors && (
          <span className="text-xs text-red-400 italic lowercase">
            {errors?.email?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <small className="py-4 text-center text-xs italic lowercase font-thin dark:text-slate-200">
          uma senha será definida automaticamente e você a receberá por e-mail
          ou em seu dispositivo móvel
        </small>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-2">
        <div className="flex items-center space-x-2">
          <span
            className="text-sky-600 text-xs lowercase font-semibold cursor-pointer"
            onClick={handleModal}
          >
            aceito os termos e políticas
          </span>
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
