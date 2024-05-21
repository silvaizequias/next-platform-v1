'use client'

import { userAuthorized } from '@/utils/handle-authorization'
import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Props {
  authorized: boolean
}

const ProfileContext = createContext<Props | any>({})

export const ProfileProvider = ({
  children,
  profiles,
}: Readonly<{ children: ReactNode; profiles: string[] }>) => {
  const [authorized, setAuthorized] = useState<boolean>(true)

  const data = useCallback(async () => {
    try {
      if (!profiles) return null
      await userAuthorized({
        profiles: profiles,
      }).then((data) => setAuthorized(data))
    } catch (error: any) {
      return null
    }
  }, [profiles])

  useEffect(() => {
    profiles && data()
  }, [data, profiles])

  return (
    <ProfileContext.Provider value={{ authorized }}>
      <Fragment>{children}</Fragment>
    </ProfileContext.Provider>
  )
}

export const useProfile = (): Promise<Props> => {
  return useContext(ProfileContext)
}

export const ProfileCustomer = ProfileContext.Consumer
