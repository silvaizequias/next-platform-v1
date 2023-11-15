'use client'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react'
import { HiOutlineLogin } from 'react-icons/hi'
import { HiMiniKey, HiOutlineIdentification } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import SignInForm from '@/components/forms/auth/sign-in'

export default function UserBar() {
  const router = useRouter()
  const session: boolean = false

  const handleClick = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <div className="relative">
      {session ? (
        <Popover backdrop="opaque" placement="bottom-end">
          <PopoverTrigger>
            <Avatar
              isBordered
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="cursor-pointer hover:opacity-50"
            />
          </PopoverTrigger>
          <PopoverContent>
            <Card
              shadow="none"
              className="max-w-[300px] border-none bg-transparent"
            >
              <CardHeader>
                <div className="flex gap-3">
                  <Avatar
                    isBordered
                    radius="full"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h4 className="text-md font-semibold leading-none text-default-600">
                      USER NAME
                    </h4>
                    <h5 className="text-sx tracking-tight text-default-500">
                      PROFILE
                    </h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-3 py-0"></CardBody>
              <CardFooter className="gap-3">
                <div className="flex flex-1 flex-col justify-center items-center">
                  <Divider className="m-2" />
                  <Button
                    className="w-full uppercase"
                    variant="flat"
                    color="primary"
                    size="sm"
                  >
                    Sair
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      ) : (
        <Popover backdrop="transparent" placement="bottom-end">
          <PopoverTrigger>
            <span className="flex cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25">
              <HiOutlineLogin />
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="max-w-[400px] p-2">
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
      )}
    </div>
  )
}
