import Box from '@/components/box'
import ButtonWithAction from '@/components/button-with-action'
import { Divider } from '@nextui-org/react'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UserSubscription(props: Props) {
  const { session } = props

  return (
    <Box>
      <div className="flex items-center gap-2">
        <h4 className="font-medium text-xl sm:text-2xl uppercase">
          Minhas Contratações
        </h4>
        <div className="flex flex-1 justify-end">
          <ButtonWithAction name="Contratar" size="sm" color='primary' variant='shadow' path='/servicos' />
        </div>
      </div>
      <Divider className="my-2" />
    </Box>
  )
}
