'use client'

import { Fragment } from 'react'
import { SubscriptionProps, SubscriptionType } from '../types'
import { List, ListItem, Typography } from '@material-tailwind/react'

export default function SubscriptionListView(props: SubscriptionProps) {
  const { data: subscriptions } = props

  return (
    <Fragment>
      <List className="w-full">
        {subscriptions &&
          subscriptions?.map((subscription: SubscriptionType) => (
            <ListItem key={subscription?.id} className="hover:shadow-sm">
              <div>
                <Typography variant="h6" className="uppercase">
                  pacote...
                </Typography>
                <Typography variant="small" className="font-normal">
                  limitação...
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
    </Fragment>
  )
}
