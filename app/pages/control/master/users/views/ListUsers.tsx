'use client'

import { useContext } from 'react'
import MasterContext from '@/app/core/contexts/master.context'

export default function ListUsers() {
  const { countUsers, users } = useContext(MasterContext)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      lista de usuários
    </div>
  )
}
