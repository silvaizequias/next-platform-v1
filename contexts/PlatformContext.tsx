'use client'

import { OrderType } from '@/types/order'
import { MemberType, OrganizationType } from '@/types/organization'
import { UserType } from '@/types/user'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'
import { ProfileLocationUpdateValidationType } from '@/validations/profile'
import { Session } from 'next-auth'
import { updateProfileLocation } from '@/app/main/perfil/actions'
import { orderRepositoryFindByMember } from '@/repositories/order/GET'
import { userRepositoryFindById } from '@/repositories/user/GET'
import { memberRepositoryFindByPhone } from '@/repositories/member/GET'
import { TaskType } from '@/types/task'

export type LocationType = {
  latitude: number
  longitude: number
}

interface Props {
  location: LocationType
  user: UserType
  member: MemberType[]
  organizations: OrganizationType[]
  orders: OrderType[]
  tasks: TaskType[]
}

const PlatformContext = createContext<Props | any>({})

export const PlatformProvider = ({
  children,
  session,
}: Readonly<{
  children: ReactNode
  session: Session
}>) => {
  const userId: string = session?.user?.id ?? ''
  const userPhone: string = session?.user?.phone ?? ''

  const [user, setUser] = useState<UserType>()
  const [member, setMember] = useState<MemberType[]>()
  const [orders, setOrders] = useState<OrderType[]>()
  const [tasks, setTasks] = useState<TaskType[]>()

  const data = useCallback(async () => {
    try {
      if (!session) return null

      await userRepositoryFindById(userId).then((data) => {
        setUser(data)
        setTasks(data?.tasks)
      })
      await orderRepositoryFindByMember(userPhone).then((data) =>
        setOrders(data),
      )
      await memberRepositoryFindByPhone(userPhone).then((data) =>
        setMember(data),
      )
    } catch (error: any) {
      console.error(error)
      return null
    }
  }, [session, userId, userPhone])

  useEffect(() => {
    if (session) data()
  }, [data, session])

  const organizations: OrganizationType[] | any = member?.map(
    (member: MemberType) => member?.active && member.organization,
  )

  const lastPosition: LocationType | any = useMemo(() => {
    let latitude = user?.latitude
    let longitude = user?.longitude

    return {
      latitude: latitude,
      longitude: longitude,
    }
  }, [user])

  const [location, setLocation] = useState<LocationType>(lastPosition)
  const [isPending, startTransition] = useTransition()

  const getUserLocation = useCallback(async () => {
    try {
      if (!user) return null

      navigator?.geolocation.watchPosition((position) => {
        if (!position) return null
        const coordinates: LocationType = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        }
        startTransition(() => setLocation(coordinates))
      })

      const available = user?.available
      const unlike: boolean = location !== lastPosition

      available &&
        setTimeout(async () => {
          const registerLocation: ProfileLocationUpdateValidationType = {
            ...location,
          }

          unlike && (await updateProfileLocation(registerLocation))
        }, 60000)
    } catch (error: any) {
      return null
    }
  }, [lastPosition, location, user])

  useEffect(() => {
    if (user) getUserLocation()
  }, [getUserLocation, user])

  return (
    <PlatformContext.Provider
      value={
        session
          ? { location, user, member, organizations, orders, tasks }
          : null
      }
    >
      {children}
    </PlatformContext.Provider>
  )
}

export const usePlatform = (): Promise<Props> => {
  return useContext(PlatformContext)
}

export const PlatformConsumer = PlatformContext.Consumer
