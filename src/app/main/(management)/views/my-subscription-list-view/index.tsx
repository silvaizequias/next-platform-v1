'use client'

import { Button } from '@material-tailwind/react'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function MySubscriptionListView(props: Props) {
  const { session } = props

  const subscriptions = [{}]

  return (
    <div className="flex flex-col justify-center gap-2">
      <h6 className="py-2 text-lg text-center font-semibold lowercase">
        minhas contratações
      </h6>
      <span className="text-center text-xs bg-sky-200 p-2 rounded shadow">
        você ainda não possui contratações
      </span>
      <Button color='green'>
        contratar serviço
      </Button>
    </div>
  )
}
