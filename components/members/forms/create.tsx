'use client'

import { useFormState } from 'react-dom'
import Members from '..'

export default function MemberCreateForm() {
  const { create } = new Members()
  const [state, formAction, isPending] = useFormState(create, {})

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="role">Função</label>
        <select id="role" name="role">
          <option value={'master'}>master</option>
          <option value={'user'}>user</option>
        </select>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Criando...' : 'Criar'}
      </button>
    </form>
  )
}
