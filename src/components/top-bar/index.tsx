'use client'

import { Session } from 'next-auth'
import Image from 'next/image'
import AppBar from '../app-bar'
import Link from 'next/link'
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Tooltip,
} from '@material-tailwind/react'
import { MdOutlineReorder } from 'react-icons/md'
import { Fragment, useCallback, useState } from 'react'
import DrawerContent from '../drawer-content'
import { NavigationType, userNavigation } from '@/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  session: Session
}

export default function TopBar(props: Props) {
  const { session } = props
  const logotipo = '/logotipo.svg'

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const router = useRouter()

  const handleDrawer = useCallback(() => {
    setOpenDrawer(!openDrawer)
  }, [openDrawer])

  const handleClick = useCallback(
    (path?: string) => {
      path && router.push(path)
      setOpenDrawer(!openDrawer)
    },
    [openDrawer, router],
  )

  return (
    <Fragment>
      <div className="fixed w-full z-10 backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
        <div className="h-14 mx-auto py-1">
          <div className="min-h-full flex justify-between items-center sm:mx-8 mx-2">
            <div className="flex items-center justify-start gap-2">
              {session && (
                <Tooltip content={'navegação'}>
                  <div className="rounded-full p-2 hover:bg-gray-50 cursor-pointer">
                    <div
                      className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl"
                      onClick={handleDrawer}
                    >
                      <MdOutlineReorder />
                    </div>
                  </div>
                </Tooltip>
              )}
              <Link className="flex items-center gap-2" href={'/'}>
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
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <AppBar session={session} />
            </div>
          </div>
        </div>
      </div>
      <DrawerContent onClose={handleDrawer} open={openDrawer} session={session}>
        <List>
          {userNavigation &&
            userNavigation?.map((item: NavigationType) => (
              <ListItem
                key={item?.path}
                onClick={() => handleClick(item?.path!)}
              >
                {item?.name}
              </ListItem>
            ))}
        </List>
      </DrawerContent>
    </Fragment>
  )
}
