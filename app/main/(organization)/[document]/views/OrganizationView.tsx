'use client'

import { useParams } from 'next/navigation'
import OrganizationCreditBox from '../components/OrganizationCreditBox'
import OrganizationMemberBox from '../components/OrganizationMember Box'
import OrganizationOrderBox from '../components/OrganizationOrderBox'
import { Suspense, useEffect, useState } from 'react'
import OrganizationInventoryBox from '../components/OrganizationInventoryBox'
import { useOrganization } from '@/contexts/OrganizationContext'
import { MemberType, SubscriptionType } from '@/types/organization'

export default function OrganizationView() {
  const { subscription }: SubscriptionType | any = useOrganization()
  const { members }: MemberType[] | any = useOrganization()
  const params = useParams()
  const { document }: any = params

  let creditCount: number = subscription?.credit
  let unlimitedCredit: boolean = subscription?.unlimited

  const [credit, setCredit] = useState<number>(creditCount)
  const [unlimited, setUnlimited] = useState<boolean>(unlimitedCredit)

  let memberCount: number = members?.length
  const [member, setMember] = useState<number>(memberCount)

  useEffect(() => {
    setCredit(creditCount)
    setUnlimited(unlimitedCredit)
    setMember(memberCount)
  }, [creditCount, memberCount, subscription, unlimitedCredit])

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full space-y-4">
        <div className="relative flex flex-col sm:flex-row gap-4">
          <div className="w-full space-y-2">
            <ul className="flex flex-col lg:flex-row gap-2">
              <li className="w-full">
                <a
                  href={unlimited || credit > 0 ? `/${document}/pedidos` : '#'}
                  className={`relative flex p-4 rounded-md shadow-md bg-gradient-to-r from-sky-600/80 to-sky-800/60 ${
                    unlimited || credit > 0
                      ? 'opacity-100 hover:opacity-80'
                      : 'opacity-20 hover:opacity-80'
                  }`}
                >
                  <OrganizationOrderBox />
                </a>
              </li>
              <li className="w-full">
                <a
                  href={`#`}
                  className={`relative flex p-4 rounded-md shadow-md bg-gradient-to-r from-sky-600/80 to-sky-800/60 ${
                    unlimited || credit > 0
                      ? 'opacity-100 hover:opacity-80'
                      : 'opacity-20 hover:opacity-80'
                  }`}
                >
                  <Suspense>
                    <OrganizationInventoryBox />
                  </Suspense>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-1">
            <ul className="flex flex-col md:flex-row gap-2">
              <li className="w-full sm:max-w-xs">
                <a href={`#`} className="block hover:opacity-80">
                  <Suspense>
                    <OrganizationCreditBox
                      credit={credit}
                      unlimited={unlimited}
                    />
                  </Suspense>
                </a>
              </li>
              <li className="w-full sm:max-w-xs">
                <a
                  href={`/${document}/membros`}
                  className="block hover:opacity-80"
                >
                  <Suspense>
                    <OrganizationMemberBox member={member} />
                  </Suspense>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4"></div>
    </div>
  )
}
