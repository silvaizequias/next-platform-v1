import { ServiceType } from '@/types/service'
import { KeyedMutator } from 'swr'
import ServiceCreateForm from './ServiceCreateForm'

interface Props {
  services: ServiceType[]
  mutate: KeyedMutator<[]>
}

export default function ServiceCreate(props: Props) {
  const { services, mutate } = props

  return <ServiceCreateForm services={services} mutate={mutate} />
}
