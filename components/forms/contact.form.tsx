'use client'

import { FormsService } from '@/services/forms.service'
import { useFormState } from 'react-dom'

export default function ContactForm() {
  const formsService = new FormsService()
  const [state, formAction, isPending] = useFormState(
    formsService.contactForm,
    {},
  )

  return (
    <form action={formAction} id="contactForm">
      <div>
        <label>Nome</label>
        <input type="text" name="name" placeholder="Seu Nome Completo" />
        {state.error && <span>{state.error?.name}</span>}
      </div>
      <div>
        <label>E-mail</label>
        <input type="email" name="email" placeholder="seu@email.com" />
        {state.error && <span>{state.error?.email}</span>}
      </div>
      <div>
        <label>Celular</label>
        <input type="number" name="phone" placeholder="55 48 98765 4321" />
        {state.error && <span>{state.error?.phone}</span>}
      </div>
      <div>
        <label>Mensagem</label>
        <textarea rows={4} name="message" placeholder="Mensagem..." />
        {state.error && <span>{state.error?.message}</span>}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
