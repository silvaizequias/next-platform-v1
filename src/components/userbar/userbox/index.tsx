'use client'

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

interface Props {
  session: Session
}

export default function UserBox(props: Props) {
  const { session } = props

  return (
    <Popover backdrop="opaque" placement="bottom-end">
      <PopoverTrigger>
        <Avatar
          isBordered
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
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
                src={
                  session.user?.image ||
                  'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                }
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
              <Listbox>
                <ListboxSection>
                  <ListboxItem key={'key'}>aqui</ListboxItem>
                </ListboxSection>
                <ListboxSection>
                  <ListboxItem key={'logout'} onClick={() => signOut()}>
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
