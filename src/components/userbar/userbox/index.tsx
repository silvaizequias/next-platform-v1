'use client'

import { NavigationType, userNavigation } from '@/navigation'
import {
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
} from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface Props {
  session: Session
}

export default function UserBox(props: Props) {
  const { session } = props

  const router = useRouter()

  const handleMenu = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <Popover backdrop="opaque" placement="bottom-end">
      <PopoverTrigger>
        <Avatar
          isBordered
          size="sm"
          src={session.user?.image || '/avatar.png'}
          className="cursor-pointer hover:opacity-50"
        />
      </PopoverTrigger>
      <PopoverContent className="bg-slate-100 dark:bg-slate-900 shadow-sm">
        <Card
          shadow="none"
          className="max-w-[300px] sm:w-[220px] border-none bg-transparent"
        >
          <CardHeader>
            <div className="flex gap-4">
              <Avatar
                isBordered
                radius="full"
                size="sm"
                src={session.user?.image || '/avatar.png'}
              />
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-md font-semibold leading-none text-default-600">
                  {session?.user?.name}
                </h4>
                <h5 className="text-xs tracking-tight text-default-500">
                  {session?.user?.profile}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-2 py-0"></CardBody>
          <CardFooter className="gap-2">
            <div className="flex flex-1 flex-col justify-center items-center">
              <Divider className="m-2" />
              <Listbox color="primary" variant="flat">
                <ListboxSection>
                  {userNavigation.map((item: NavigationType) => (
                    <ListboxItem
                      className="uppercase text-xs"
                      key={item.name}
                      onClick={() => handleMenu(`${item.path}`)}
                    >
                      {item.name}
                    </ListboxItem>
                  ))}
                </ListboxSection>
                <ListboxSection>
                  <ListboxItem
                    className="uppercase text-xs"
                    key={'logout'}
                    onClick={() => signOut()}
                  >
                    Sair
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            </div>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
