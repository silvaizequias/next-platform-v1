'use client'

import MasterContext from '@/app/core/contexts/master.context'
import { useContext } from 'react'

export default function ListMembers() {
  const { countMembers, members } = useContext(MasterContext)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      lista de membros
    </div>
  )
}
