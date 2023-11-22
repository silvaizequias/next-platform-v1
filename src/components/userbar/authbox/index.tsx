'use client'

import SignInForm from '@/components/forms/auth/sign-in'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  Tooltip,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { HiOutlineLogin } from 'react-icons/hi'
import { HiOutlineIdentification, HiMiniKey } from 'react-icons/hi2'

export default function AuthBox() {
  const router = useRouter()

  const handleClick = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <Popover backdrop="transparent" placement="bottom-end">
      <PopoverTrigger>
        <span className="flex cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25">
          <HiOutlineLogin />
        </span>
      </PopoverTrigger>
      <PopoverContent className=" bg-slate-100 dark:bg-slate-900 shadow-sm">
        <div className="p-2 min-w-[340px] sm:w-[340px]">
          <SignInForm />
          <div className="flex flex-col justify-center items-center">
            <Divider className="m-4" />
            <div className="flex flex-1 justify-between gap-x-6">
              <Tooltip content="Registrar-se">
                <span
                  className="flex cursor-pointer rounded-full p-2 text-2xl hover:opacity-60 hover:bg-opacity-90 bg-green-400 opacity-30"
                  onClick={() => handleClick('/registrar-se')}
                >
                  <HiOutlineIdentification />
                </span>
              </Tooltip>
              <Tooltip content="Redefinir a Senha">
                <span
                  className="flex cursor-pointer rounded-full p-2 text-2xl hover:opacity-60 hover:bg-opacity-90 bg-orange-400 opacity-30"
                  onClick={() => handleClick('/redefinir-senha')}
                >
                  <HiMiniKey />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
