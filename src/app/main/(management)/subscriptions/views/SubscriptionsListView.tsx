'use client'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { SubscriptionType } from '../types'
import { SubscriptionsColumnsView } from './SubscriptionsColumnsView'

interface Props {
  subscriptions: SubscriptionType[] | any
}

export default function SubscriptionsListView(props: Props) {
  const { subscriptions } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(subscription) => subscription?.id}
        rows={subscriptions}
        columns={SubscriptionsColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
