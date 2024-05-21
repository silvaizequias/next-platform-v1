'use client'

import { memberAuthorized } from '@/utils/handle-authorization'
import {
  createContext,
  Fragment,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Props {
  authorized: boolean
}

const RoleContext = createContext<Props | any>({})

export const RoleProvider = ({
  children,
  document,
  roles,
}: Readonly<{ children?: ReactNode; document: string; roles?: string[] }>) => {
  const [authorized, setAuthorized] = useState<boolean>(true)

  const data = useCallback(async () => {
    try {
      if (!document) return null

      await memberAuthorized({
        organizationDocument: document,
        roles: roles,
      }).then((data) => setAuthorized(data[0]))
    } catch (error: any) {
      return null
    }
  }, [document, roles])

  useEffect(() => {
    document && data()
  }, [data, document])

  return (
    <Suspense>
      <RoleContext.Provider value={document ? { authorized } : null}>
        {authorized ? <Fragment>{children}</Fragment> : null}
      </RoleContext.Provider>
    </Suspense>
  )
}

export const useRole = (): Promise<Props> => {
  return useContext(RoleContext)
}

export const RoleCustomer = RoleContext.Consumer
