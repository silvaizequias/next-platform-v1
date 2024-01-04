'use client'

import {
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react'
import Image from 'next/image'
import { Session } from 'next-auth'
import { ReactNode, useCallback } from 'react'
import { MdLogout } from 'react-icons/md'
import { signOut } from 'next-auth/react'

interface Props {
  children: ReactNode
  onClose: () => void
  open: boolean
  session?: Session
}

export default function DrawerContent(props: Props) {
  const { children, onClose, open, session } = props

  const logotipo = '/logotipo.svg'

  const handleClick = useCallback(() => {
    signOut()
    onClose()
  }, [onClose])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      className="flex gap-4 h-full min-h-screen drop-shadow-md w-[280px] bg-blue-gray-100"
    >
      <div className="flex flex-col justify-between min-w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 shadow-md">
            <Image
              className="my-2 w-[17px] h-[25px]"
              src={logotipo}
              alt={'dedicado'}
              priority
              width={17}
              height={25}
            />
            <h6 className="text-xl sm:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-light-blue-200 font-semibold lowercase text-sky-400 cursor-pointer">
              dedicado
            </h6>
          </div>
          <div className="flex flex-col w-full">
            <div className="py-4">{children}</div>
          </div>
        </div>
        <div className="flex flex-1 items-end">
          <div className="flex flex-col w-full">
            {session && (
              <List>
                <ListItem onClick={handleClick}>
                  <ListItemPrefix>
                    <div className="text-light-blue-200 hover:text-light-blue-400 text-xl cursor-pointer">
                      <MdLogout />
                    </div>
                  </ListItemPrefix>
                  sair
                </ListItem>
              </List>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  )
}
