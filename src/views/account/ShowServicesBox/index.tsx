import { Grid } from '@mui/material'
import { ShowServicesBoxProps } from '../types'
import { useFetch } from '@/hooks/useFetch'
import { ServiceType } from '@/views/services/types'
import SubscriptionServiceCard from './SubscriptionServiceCard'
import { Fragment } from 'react'

export default function ShowServicesBox(props: ShowServicesBoxProps) {
  const { user } = props
  const { data: services } = useFetch<ServiceType[]>(`/api/services`)

  return services ? (
    <Fragment>
      {services?.map(
        (service: ServiceType) =>
          service?.isAvaliable == true && (
            <Grid key={service?.id} item xs={12} sm={6} md={3}>
              <SubscriptionServiceCard service={service} user={user!} />
            </Grid>
          ),
      )}
    </Fragment>
  ) : null
}
