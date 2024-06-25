'use client'

import { useFormState } from 'react-dom'
import Accounts from '..'

export default function AccountCreateForm() {
  const { create } = new Accounts()
  const [state, formAction, isPending] = useFormState(create, {})

  return (
    <form action={formAction} id="accountCreateForm">
      <div>
        <label htmlFor="role">Função</label>
        <select id="role" name="role">
          <option value={'master'}>master</option>
          <option value={'user'}>user</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Nome</label>
        <input id="name" type="text" name="name" placeholder="Nome Completo" />
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
        <label htmlFor="phone">Celular</label>
        <input
          id="phone"
          type="number"
          name="phone"
          placeholder="55 48 98765 4321"
        />
        {state.error && <span>{state.error?.phone}</span>}
      </div>
      <div>
        <label htmlFor="document">Documento</label>
        <input id="document" type="text" name="document" />
        {state.error && <span>{state.error?.document}</span>}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Criando...' : 'Criar'}
      </button>
    </form>
  )
}
