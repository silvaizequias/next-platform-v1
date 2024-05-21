'use client'

import Image from 'next/image'
import { celularMask } from 'masks-br'
import { MemberType } from '@/types/organization'
import UpdateMemberView from './UpdateMemberView'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RoleProvider } from '@/contexts/RoleContext'

interface Props {
  member: MemberType
}

export default function MemberDetailInListView(props: Props) {
  const { member } = props

  const params = useParams()
  const { document }: any = params

  let userAvailable: boolean = member?.user?.available

  const [available, setAvailable] = useState<boolean>(userAvailable)

  useEffect(() => {
    member && setAvailable(userAvailable)
  }, [member, userAvailable])

  const image = member?.user?.image || '/avatar.svg'

  return member ? (
    <li
      className={`my-2 p-4 bg-slate-200 dark:bg-slate-800 dark:text-sky-600 rounded-md hover:shadow-md cursor-pointer ${
        !member?.active && 'opacity-25'
      }`}
    >
      <div className="flex items-center justify-between space-x-2">
        <a className="flex flex-1 flex-col">
          <div className="flex items-center space-x-2">
            <div
              className={`p-1 rounded-md ${
                available ? 'bg-green-400/50 animate-pulse' : 'bg-sky-400/50'
              } shadow-md`}
            >
              <div className="w-['32px'] w-h-['32px']">
                <Image
                  className="rounded-md hover:opacity-80"
                  src={image}
                  loading="lazy"
                  alt={member?.user?.name ?? ''}
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h6 className="text-xl font-semibold hover:opacity-50 lowercase">
                {member?.user?.name ?? ''}
              </h6>
              <span className="text-xs text-white bg-sky-600/50 p-1 rounded-md">
                {member?.role}
              </span>

              <small className="normal-nums font-thin">
                {celularMask(member?.user?.phone)}
              </small>
            </div>
          </div>
        </a>
        <div className="flex items-center space-x-2">
          <UpdateMemberView member={member} />
        </div>
      </div>
    </li>
  ) : null
}
