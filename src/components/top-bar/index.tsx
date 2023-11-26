'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

interface Props {
  session: Session
}

export default function TopBar(props: Props) {
  const { session } = props

  return session ? <button onClick={() => signOut()}>sair</button> : ''
}
