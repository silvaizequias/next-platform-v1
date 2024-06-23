'use client'

import { useFormState } from 'react-dom'
import Organizations from '..'

export default function OrganizationUpdateForm() {
  const { update } = new Organizations()
  const [state, formAction, isPending] = useFormState(update, {})

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Nome</label>
        <input id="name" type="text" name="name" />
        {state.error && <span>{state.error?.name}</span>}
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="seu@email.com"
        />
        {state.error && <span>{state.error?.email}</span>}
      </div>
      <div>
        <label htmlFor="phone">Telefone</label>
        <input
          id="phone"
          type="number"
          name="phone"
          placeholder="55 48 98765 4321"
        />
        {state.error && <span>{state.error?.phone}</span>}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Atualizando...' : 'Atualizar'}
      </button>
    </form>
  )
}
