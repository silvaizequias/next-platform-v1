import { OrganizationType } from '@/types/organization'
import { KeyedMutator } from 'swr'
import OrganizationCreateForm from './OrganizationCreateForm'

interface Props {
  organizations: OrganizationType[]
  mutate: KeyedMutator<[]>
}

export default function OrganizationCreate(props: Props) {
  const { organizations, mutate } = props

  return (
    <OrganizationCreateForm organizations={organizations} mutate={mutate} />
  )
}
