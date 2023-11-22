'use client'

import {
  NavigationType,
  defaultNavigation,
  masterNavigation,
  sessionNavigation,
} from '@/navigation'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { HiMenu } from 'react-icons/hi'

interface Props {
  session: Session
}

export default function TopMenu(props: Props) {
  const { session } = props
  const router = useRouter()

  const handleMenu = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <Dropdown className=" bg-slate-100 dark:bg-slate-900 shadow-sm">
      <DropdownTrigger>
        <span className="cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25">
          <HiMenu />
        </span>
      </DropdownTrigger>
      <DropdownMenu color="primary" variant="flat">
        <DropdownSection>
          {defaultNavigation.map((item: NavigationType) => (
            <DropdownItem
              className="uppercase text-xs"
              key={item.name}
              onClick={() => handleMenu(`${item.path}`)}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection hidden={session ? false : true}>
          {sessionNavigation.map((item: NavigationType) => (
            <DropdownItem
              className="uppercase text-xs"
              key={item.name}
              onClick={() => handleMenu(`${item.path}`)}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection
          hidden={session?.user?.profile == 'MASTER' ? false : true}
        >
          {masterNavigation.map((item: NavigationType) => (
            <DropdownItem
              className="uppercase text-xs"
              key={item.name}
              onClick={() => handleMenu(`${item.path}`)}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
