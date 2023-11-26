import { ServiceType } from '@/types/service'
import { KeyedMutator } from 'swr'
import ServiceUpdateForm from './ServiceUpdateForm'

interface Props {
  service: ServiceType
  services: ServiceType[]
  mutate: KeyedMutator<[]>
}

export default function ServiceUpdate(props: Props) {
  const { service, services, mutate } = props

  return (
    <ServiceUpdateForm service={service} services={services} mutate={mutate} />
  )
}
