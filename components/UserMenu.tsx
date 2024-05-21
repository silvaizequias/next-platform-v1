'use client'

import Image from 'next/image'
import { Fragment, Suspense, useCallback } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  MdAccountBox,
  MdDomain,
  MdLogout,
  MdOutlineDomainAdd,
  MdOutlineMapsHomeWork,
} from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { OrganizationType } from '@/types/organization'
import { usePlatform } from '@/contexts/PlatformContext'
import Link from 'next/link'
import { UserType } from '@/types/user'
import { updateProfileAvailable } from '@/app/main/perfil/actions'
import toast from 'react-hot-toast'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserMenu() {
  const { user }: UserType | any = usePlatform()
  const { organizations }: OrganizationType[] | any = usePlatform()
  const avatar = user?.image || '/avatar.svg'

  const route = useRouter()
  const handleSignOut = useCallback(async () => {
    await updateProfileAvailable(false)
      .then(() => {
        toast.success(`até breve ${user?.name}`)
        signOut({ redirect: true })
        route.refresh()
      })
      .catch((error: any) => console.log(error))
  }, [route, user])

  return (
    <Fragment>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex rounded-full mx-auto p-1 cursor-pointer hover:opacity-50 hover:shadow-md">
            <Image
              className="w-[32px] h-[32px] mx-auto rounded-full"
              src={avatar}
              alt={'dedicado'}
              width={32}
              height={32}
              priority
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col gap-1 mt-2">
              <div className="px-2">
                <Link
                  href={'/nova-organizacao'}
                  className="w-full flex item-center gap-2 text-xs text-center text-slate-200 bg-sky-800 p-2 rounded-md cursor-pointer hover:text-opacity-50"
                >
                  <MdOutlineDomainAdd size={18} />
                  criar nova organização
                </Link>
              </div>
              <div className="px-2">
                <span className="w-full flex item-center gap-2 text-xs text-center text-slate-200 bg-sky-800/70 p-2 rounded-md">
                  <MdDomain size={18} />
                  minhas organizações
                </span>
              </div>
              <Suspense>
                {organizations &&
                  organizations?.map((organization: OrganizationType) => {
                    return (
                      <Menu.Item key={organization?.id}>
                        {({ active }) => (
                          <a
                            href={`/${organization?.document}`}
                            className={classNames(
                              active ? 'bg-slate-400/50' : 'font-normal',
                              'flex items-center px-4 py-2 gap-2 cursor-pointer',
                            )}
                          >
                            <MdOutlineMapsHomeWork size={18} />
                            {organization?.name}
                          </a>
                        )}
                      </Menu.Item>
                    )
                  })}
              </Suspense>

              <hr className="m-2 border-1 border-slate-400" />
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/perfil"
                    className={classNames(
                      active ? 'bg-slate-400/50' : 'font-normal',
                      'flex items-center px-4 py-2 gap-2',
                    )}
                  >
                    <MdAccountBox size={18} />
                    meu perfil
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={handleSignOut}
                    className={classNames(
                      active ? 'bg-slate-400/50' : 'font-normal',
                      'flex items-center px-4 py-2 gap-2 cursor-pointer',
                    )}
                  >
                    <MdLogout size={18} />
                    sair
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  )
}
