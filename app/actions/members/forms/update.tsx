'use client'

import { useFormState } from 'react-dom'
import Members from '..'

export default function MemberUpdateForm() {
  const { update } = new Members()
  const [state, formAction, isPending] = useFormState(update, {})

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
        {isPending ? 'Atualizando...' : 'Atualizar'}
      </button>
    </form>
  )
}
