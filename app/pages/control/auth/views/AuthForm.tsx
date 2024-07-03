'use client'

import { AuthService } from '@/app/core/services/auth.service'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

export default function AuthForm() {
  const router = useRouter()
  const { authentication, validation } = new AuthService()
  const [codeSended, setCodeSended] = useState<boolean>(false)
  const [stateAuthentication, formAuthentication] = useFormState(
    authentication,
    {
      status: false,
    },
  )
  const [stateValidation, formValidation] = useFormState(validation, {
    status: false,
  })

  useEffect(() => {
    stateValidation?.status && setCodeSended(true)
    stateAuthentication?.status && router.push('/')
  }, [router, stateAuthentication, stateValidation])

  return (
    <form
      action={codeSended ? formAuthentication : formValidation}
      noValidate
      className="relative w-full flex flex-col gap-4 items-center p-4 rounded-md bg-slate-200 shadow-md"
    >
      <div className={`w-full flex flex-col gap-2 ${codeSended && 'hidden'}`}>
        <label htmlFor="phone" className="text-xs -mb-2">
          Celular
        </label>
        <input
          id="phone"
          name="phone"
          type="number"
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        <span className="text-xs text-red-600 italic">
          {(stateValidation?.errors && stateValidation.errors.phone) ||
            (stateAuthentication?.errors && stateAuthentication?.errors.phone)}
        </span>
        <p>
          Você receberá um SMS com um código de 6 dígitos para autenticar-se.
        </p>
      </div>
      <div className={`w-full flex flex-col gap-2 ${!codeSended && 'hidden'}`}>
        <label htmlFor="code" className="text-xs -mb-2">
          Código
        </label>
        <input
          id="code"
          name="code"
          type="text"
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        <span className="text-xs text-red-600 italic">
          {stateAuthentication?.errors && stateAuthentication?.errors.code}
        </span>
        <p>Informe o código de 6 dígitos recebido por SMS.</p>
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-sky-600/80 hover:bg-sky-800 hover:shadow-md text-white uppercase"
      >
        {codeSended ? 'Autenticar' : 'Validar'}
      </button>
    </form>
  )
}
