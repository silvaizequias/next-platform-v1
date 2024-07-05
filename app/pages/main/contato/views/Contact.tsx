'use client'

import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { actionContact } from '../actions'

export default function Contact() {
  const [state, formAction] = useFormState(actionContact, {
    errors: undefined,
    success: false,
  })
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/')
  }, [router, state])

  return (
    <form
      action={formAction}
      noValidate
      className="relative w-full flex flex-col gap-4 items-center p-4 rounded-md bg-slate-200 shadow-md"
    >
      <div className="w-full flex flex-col">
        <label htmlFor="name" className="text-xs">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        {state?.errors && (
          <span className="text-xs text-red-600 italic">
            {state.errors.name}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="phone" className="text-xs">
          Seu whatsapp
        </label>
        <input
          id="phone"
          name="phone"
          type="number"
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        {state?.errors && (
          <span className="text-xs text-red-600 italic">
            {state.errors.phone}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="email" className="text-xs">
          Seu melhor e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        {state?.errors && (
          <span className="text-xs text-red-600 italic">
            {state.errors.email}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="subject" className="text-xs">
          Qual será o assunto?
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        {state?.errors && (
          <span className="text-xs text-red-600 italic">
            {state.errors.subject}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="message" className="text-xs">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w- p-2 rounded-md shadow-sm border-none"
        />
        {state?.errors && (
          <span className="text-xs text-red-600 italic">
            {state.errors.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-sky-600/80 hover:bg-sky-800 hover:shadow-md text-white uppercase"
      >
        Enviar
      </button>
    </form>
  )
}
