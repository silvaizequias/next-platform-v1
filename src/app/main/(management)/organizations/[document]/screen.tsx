import PageScreen from '@/components/page-screen'
import { OrganizationType } from '../types'
import OrganizationOnlyView from './views/organization-only-view'
import UsersThisOrganziation from './views/users-this-organization'
import Box from '@/components/box'

interface Props {
  organization: OrganizationType
}

export default function OrganizationOnlyScreen(props: Props) {
  const { organization } = props

  return (
    <PageScreen title={organization?.name}>
      <Box>
        <div className="w-full sm:w-1/2">
          <OrganizationOnlyView organization={organization} />
        </div>
        <div className="w-full sm:w-1/2">serviços da organização</div>
      </Box>
      <div className="w-full">
        <UsersThisOrganziation organization={organization} />
      </div>
    </PageScreen>
  )
}
