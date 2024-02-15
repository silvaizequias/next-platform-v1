'use client'

import { Box, Paper, Tab, Tabs } from '@mui/material'
import { UserType } from '../../users/types'
import TabPanel from '@/components/TabPanel'
import { AssignmentInd, Password } from '@mui/icons-material'
import { useState, SyntheticEvent } from 'react'
import ProfileUpdateFormView from './ProfileUpdateFormView'
import ProfilePasswordUpdateFormView from './ProfilePasswordUpdateFormView'

interface Props {
  profile: UserType | any
}

export default function ProfileRightView(props: Props) {
  const { profile } = props

  const [value, setValue] = useState<number>(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box component={'div'} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<AssignmentInd />} label="informações básicas" value={0} />
          <Tab icon={<Password />} label="atualizar a senha" value={1} />
        </Tabs>
      </Box>
      <Box component={Paper} sx={{ marginY: 2 }}>
        <TabPanel value={value} index={0}>
          <ProfileUpdateFormView profile={profile} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfilePasswordUpdateFormView profile={profile} />
        </TabPanel>
      </Box>
    </Box>
  )
}
