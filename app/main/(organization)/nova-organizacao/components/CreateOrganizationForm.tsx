'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CreateOrganizationValidation,
  CreateOrganizationValidationType,
} from '@/validations/organization'
import { useState, useTransition } from 'react'
import { AddressByZipCodeType } from '@/utils/handle-address/types'
import { getAddressByZipCode } from '@/utils/handle-address'
import { createOrganizationForUser } from '../actions'
import { useRouter } from 'next/navigation'
import useCountries from 'use-countries'
import { codeCountries } from '@/helpers'

export default function CreateOrganizationForm() {
  const [isPending, startTransition] = useTransition()
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()

  const router = useRouter()
  const { countries } = useCountries()

  const limitCountries = countries.filter((country) =>
    codeCountries.includes(country.code),
  )

  const [country, setCountry] = useState(limitCountries[1].phone)
  const handleCountry = (e: any) => {
    setCountry(e.target?.value)
  }

  const handleZipCode = (event: { target: { value: any } }) => {
    const data = event.target.value?.replace(/[^0-9]/g, '')
    if (data.length == 8) {
      startTransition(async () => {
        const { cep, address, lat, lng }: AddressByZipCodeType | any =
          await getAddressByZipCode(data)

        if (cep) {
          setValue('street', address)
          setLocation({ latitude: Number(lat), longitude: Number(lng) })
        } else {
          toast.error(`cep ${data} inválido`)
        }
      })
    } else {
      toast.error(`este cep ${data} é inválido`)
    }
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<CreateOrganizationValidationType>({
    resolver: zodResolver(CreateOrganizationValidation),
  })
  const onSubmit: SubmitHandler<CreateOrganizationValidationType> = async (
    inputs,
  ) => {
    await createOrganizationForUser({
      ...inputs,
      latitude: location?.latitude,
      longitude: location?.longitude,
    })
      .then((data: any) => {
        if (data?.response?.error) {
          toast.error(data?.message)
        } else {
          reset()
          toast.success(data)
          router.refresh()
          setTimeout(() => router.push(`/${inputs?.document}`), 5000)
        }
      })
      .catch((error: any) => toast.error(error?.message))
  }

  return (
    <form
      className="relative flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full sm:w-2/3">
          <label htmlFor="name" className="dark:text-slate-400 font-thin">
            nome
          </label>
          <input
            id="name"
            className="w-full rounded-md"
            {...register('name')}
            type="text"
            placeholder="nome da organização"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.name?.message}
            </span>
          )}
        </div>
        <div className="relative w-full sm:w-1/3">
          <label htmlFor="document" className="dark:text-slate-400 font-thin">
            cnpj
          </label>
          <input
            id="document"
            className="w-full rounded-md"
            {...register('document')}
            type="number"
            placeholder="00.000.000/0000-00"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.document?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
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
            <label htmlFor="phone" className="dark:text-slate-400 font-thin">
              telefone
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
        <div className="relative w-full">
          <label htmlFor="email" className="dark:text-slate-400 font-thin">
            e-mail
          </label>
          <input
            id="email"
            className="w-full rounded-md"
            {...register('email')}
            type="text"
            placeholder="email@suaorganizacao.com.br"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.email?.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full sm:w-1/3">
          <label htmlFor="zipCode" className="dark:text-slate-400 font-thin">
            cep
          </label>
          <input
            className="w-full rounded-md"
            {...register('zipCode')}
            type="number"
            onBlur={handleZipCode}
            placeholder="00.000-000"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.zipCode?.message}
            </span>
          )}
        </div>
        <div className="relative w-full sm:w-2/3">
          <label htmlFor="street" className="dark:text-slate-400 font-thin">
            logradouro
          </label>
          <input
            id="street"
            className="w-full rounded-md bg-slate-200/50 border-0"
            {...register('street')}
            type="text"
            disabled
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.street?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full">
          <label htmlFor="complement" className="dark:text-slate-400 font-thin">
            complemento
          </label>
          <input
            id="complement"
            className="w-full rounded-md"
            {...register('complement')}
            type="text"
            placeholder="número e ponto de referência"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.complement?.message}
            </span>
          )}
        </div>
      </div>

      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        criar organização
      </button>
    </form>
  )
}
