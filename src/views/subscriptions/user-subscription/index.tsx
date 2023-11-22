import Box from '@/components/box'
import { Divider } from '@nextui-org/react'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UserSubscription(props: Props) {
  const { session } = props

  return (
    <Box>
      <h4 className="font-medium text-xl sm:text-2xl uppercase">
        Minhas Contratações
      </h4>
      <Divider />
    </Box>
  )
}
