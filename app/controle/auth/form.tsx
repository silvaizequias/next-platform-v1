'use client'

import { useEffect, useState } from 'react'
import { AuthActions } from './actions'
import { useFormState } from 'react-dom'

export default function ControlAuthForm() {
  const [validateCode, setValidateCode] = useState<boolean>(false)
  const { login, code } = new AuthActions()
  const [stateCode, formCode] = useFormState(code, {
    status: false,
  })
  const [stateLogin, formLogin] = useFormState(login, {
    status: false,
  })

  useEffect(() => {
    if (stateCode.status == true) setValidateCode(true)
  }, [stateCode])

  return (
    <form
      action={validateCode ? formLogin : formCode}
      noValidate
      className="relative w-full flex flex-col justify-center items-center gap-4"
    >
      <div hidden={!validateCode} className="w-full">
        <label htmlFor="code" className="text-xs">
          Código
        </label>
        <input
          id="code"
          name="code"
          type="text"
          className="w-full p-2 border-none rounded-md shadow-sm"
        />
        <span className="text-xs text-red-600 italic">
          {stateLogin.errors ? stateLogin.errors.code : ''}
        </span>
        <div className="w-full py-4">
          <small className="text-opacity-80 text-center">
            Informe o código de 6 dígitos que foi enviado para o número de seu
            dispositivo móvel.
          </small>
        </div>
      </div>

      <div hidden={validateCode} className="w-full">
        <label htmlFor="phone" className="text-xs">
          Celular
        </label>
        <input
          id="phone"
          name="phone"
          type="number"
          className="w-full p-2 border-none rounded-md shadow-sm"
        />
        <span className="text-xs text-red-600 italic">
          {stateCode.errors || stateLogin.erros
            ? stateCode.errors.phone || stateLogin.errors.phone
            : ''}
        </span>
        <div className="w-full py-4">
          <small className="text-opacity-80 text-center">
            Você receberá em seu dispositivo móvel um código de 6 dígitos para
            autenticar-se.
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-2 rounded-md bg-sky-800 hover:bg-opacity-80 hover:shadow-md text-slate-200 uppercase"
      >
        {validateCode ? 'Autenticar' : 'Verificar'}
      </button>
    </form>
  )
}
