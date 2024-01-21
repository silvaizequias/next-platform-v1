'use client'

import { Button } from '@material-tailwind/react'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function MyOrganizationListView(props: Props) {
  const { session } = props

  const organizations = [
    {
      name: 'dedicado digital',
      role: 'owner',
    },
  ]

  return (
    <div className="flex flex-col justify-center gap-2">
      <h6 className="py-2 text-lg text-center font-semibold lowercase">
        minhas organizações
      </h6>
      {organizations &&
        organizations.map((organization: any) => (
          <div
            key={organization.name}
            className="bg-blue-200 rounded p-2 cursor-pointer hover:opacity-90 hover:shadow-xl"
          >
            <div className="flex flex-col">
              <h6 className="text-lg font-medium lowercase">
                {organization.name}
              </h6>
              <p className="text-base font-thin lowercase">
                {organization.role}
              </p>
            </div>
          </div>
        ))}
      <Button color="light-blue">criar organização</Button>
    </div>
  )
}
