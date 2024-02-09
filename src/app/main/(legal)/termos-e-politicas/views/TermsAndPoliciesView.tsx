'use client'

import TabPanel from '@/components/TabPanel'
import { AdminPanelSettings, RecentActors } from '@mui/icons-material'
import { Box, Paper, Tab, Tabs } from '@mui/material'
import { useState, SyntheticEvent } from 'react'
import DataPrivacyPolicy from '../contents/DataPrivacyPolicy.mdx'
import DataUsePolicy from '../contents/DataUsePolicy.mdx'

export default function TermsAndPoliciesView() {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box component={'div'} sx={{ width: '100%', maxWidth: 'md' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            icon={<AdminPanelSettings />}
            label="política de confidencialidade"
            value={0}
          />
          <Tab
            icon={<RecentActors />}
            label="política de uso de dados"
            value={1}
          />
        </Tabs>
      </Box>
      <Box component={Paper} sx={{ marginY: 2 }}>
        <TabPanel value={value} index={0}>
          <div className="prose">
            <DataPrivacyPolicy />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="prose">
            <DataUsePolicy />
          </div>
        </TabPanel>
      </Box>
    </Box>
  )
}
