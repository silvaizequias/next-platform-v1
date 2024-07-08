'use client'

import { useCallback, useEffect, useState } from 'react'
import { actionFindAllUsers } from '../actions'

export default function ListUsers() {
  const [users, setUsers] = useState([])

  const getUsers = useCallback(async () => {
    return await actionFindAllUsers().then((data) =>
      setUsers(data.response.users),
    )
  }, [])
  useEffect(() => {
    getUsers()
  }, [getUsers])
  console.log('users: ', users)
  return (
    <div className="w-full h-screen flex justify-center items-center">
      lista de usuários
    </div>
  )
}
