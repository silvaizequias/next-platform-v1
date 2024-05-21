'use client'

import { organizationRepositoryFindByDocument } from '@/repositories/organization/GET'
import {
  MemberType,
  OrganizationType,
  SubscriptionType,
} from '@/types/organization'
import { Session } from 'next-auth'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface Props {
  organization: OrganizationType
  subscription: SubscriptionType
  members: MemberType[]
}

const OrganizationContext = createContext<Props | any>({})

export const OrganizationProvider = ({
  children,
  document,
  session,
}: Readonly<{
  children: ReactNode
  document: string
  session: Session
}>) => {
  const [members, setMembers] = useState<MemberType[]>()
  const [organization, setOrganization] = useState<OrganizationType>()
  const [subscription, setSubscription] = useState<SubscriptionType>()
  const [authorization, setAuthorization] = useState<string>('')

  const getOrganziation = useCallback(async () => {
    if (!session) return null

    const organization = await organizationRepositoryFindByDocument(document)
    setOrganization(organization)

    if (organization) {
      setMembers(organization?.members)
      setSubscription(organization?.subscription)
      setAuthorization(organization?.authorizationKey)
    }
  }, [document, session])

  const authorizationKey: string = useMemo(() => {
    return authorization
  }, [authorization])

  useEffect(() => {
    if (session) getOrganziation()
  }, [getOrganziation, session])

  return (
    <OrganizationContext.Provider
      value={
        session
          ? { authorizationKey, members, organization, subscription }
          : null
      }
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export const useOrganization = (): Promise<Props> => {
  return useContext(OrganizationContext)
}

export const OrganizationConsumer = OrganizationContext.Consumer
