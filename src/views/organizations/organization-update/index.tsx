import { OrganizationType } from '@/types/organization'
import { KeyedMutator } from 'swr'
import OrganizationUpdateForm from './OrganizationUpdateForm'

interface Props {
  organization: OrganizationType
  organizations: OrganizationType[]
  mutate: KeyedMutator<[]>
}

export default function OrganizationUpdate(props: Props) {
  const { organization, organizations, mutate } = props

  return (
    <OrganizationUpdateForm
      organization={organization}
      organizations={organizations}
      mutate={mutate}
    />
  )
}
