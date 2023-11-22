import Box from '@/components/box'
import { Divider } from '@nextui-org/react'
import { Session } from 'next-auth'
import AddOrganization from '../add-organization'

interface Props {
  session: Session
}

export default function OrganizationUser(props: Props) {
  const { session } = props

  return (
    <Box>
      <div className="flex items-center gap-2">
        <h4 className="font-medium text-xl sm:text-2xl uppercase">
          Minhas Organizações
        </h4>
        <div className="flex flex-1 justify-end">
          <AddOrganization session={session} />
        </div>
      </div>
      <Divider className="my-2" />
    </Box>
  )
}
