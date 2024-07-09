'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { actionFindAllUsers } from '../actions/users.action'
import { Member, Organization, Subscription, User } from '@prisma/client'
import { actionFindAllOrganizations } from '../actions/organizations.action'
import { actionFindAllSubscriptions } from '../actions/subscriptions.action'
import { actionFindAllMembers } from '../actions/members.action'

interface Props {
  countMembers: number
  members: Member[]
  countOrganizations: number
  organizations: Organization[]
  countSubscriptions: number
  subscriptions: Subscription[]
  countUsers: number
  users: User[]
}
export const MasterContext = createContext({} as Props)

export default function MasterProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [countMembers, setCountMembers] = useState<number>(0)
  const [members, setMembers] = useState<Member[]>([])

  const [countOrganizations, setCountOrganizations] = useState<number>(0)
  const [organizations, setOrganizations] = useState<Organization[]>([])

  const [countSubscriptions, setCountSubscriptions] = useState<number>(0)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  const [countUsers, setCountUsers] = useState<number>(0)
  const [users, setUsers] = useState<User[]>([])

  const getMembers = useCallback(async () => {
    return await actionFindAllMembers().then((data) => {
      setCountMembers(data.response.count), setMembers(data.response?.data)
    })
  }, [])

  const getOrganizations = useCallback(async () => {
    return await actionFindAllOrganizations().then((data) => {
      setCountOrganizations(data.response.count),
        setOrganizations(data.response?.data)
    })
  }, [])

  const getSubscriptions = useCallback(async () => {
    return await actionFindAllSubscriptions().then((data) => {
      setCountSubscriptions(data.response.count),
        setSubscriptions(data.response?.data)
    })
  }, [])

  const getUsers = useCallback(async () => {
    return await actionFindAllUsers().then((data) => {
      setCountUsers(data.response.count), setUsers(data.response?.data)
    })
  }, [])

  useEffect(() => {
    getMembers()
    getOrganizations()
    getSubscriptions()
    getUsers()
  }, [getMembers, getOrganizations, getSubscriptions, getUsers])

  return (
    <MasterContext.Provider
      value={{
        countMembers,
        members,
        countOrganizations,
        organizations,
        countSubscriptions,
        subscriptions,
        countUsers,
        users,
      }}
    >
      {children}
    </MasterContext.Provider>
  )
}
