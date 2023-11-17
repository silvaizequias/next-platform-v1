'use client'

import { NavigationType, topnav } from '@/navigation'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { HiMenu } from 'react-icons/hi'

export default function TopMenu() {
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
        {topnav.map((item: NavigationType) => (
          <DropdownItem
            className="uppercase text-xs"
            key={item.name}
            onClick={() => handleMenu(`${item.path}`)}
          >
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
