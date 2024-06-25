'use client'

import { useFormState } from 'react-dom'
import Addresses from '..'

export default function AddressCreateForm() {
  const { create } = new Addresses()
  const [state, formAction, isPending] = useFormState(create, {})

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="zipCode">CEP</label>
        <input
          id="zipCode"
          type="number"
          name="zipCode"
          placeholder="00.000-000"
        />
        {state.error && <span>{state.error?.zipCode}</span>}
      </div>
      <div>
        <label htmlFor="street">Logradouro</label>
        <input
          id="street"
          type="text"
          name="street"
          placeholder="Rua, Avenida, Alameda..."
        />
        {state.error && <span>{state.error?.street}</span>}
      </div>
      <div>
        <label htmlFor="complement">Complemento</label>
        <input
          id="complement"
          type="text"
          name="complement"
          placeholder="Número, Apartamento, Bloco, Referência..."
        />
        {state.error && <span>{state.error?.complement}</span>}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Criando...' : 'Criar'}
      </button>
    </form>
  )
}
