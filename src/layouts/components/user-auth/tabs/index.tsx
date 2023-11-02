'use client'

import { Badge, Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { SyntheticEvent, useState } from 'react'
import { HowToReg, LockReset, Login } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import AuthSignInForm from '@/views/auth/AuthSignInForm'
import AuthSignUpForm from '@/views/auth/AuthSignUpForm'
import AuthResetPasswordForm from '@/views/auth/AuthResetPasswordForm'

export default function AuthTabs() {
  const [value, setValue] = useState<string>('sign-in')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 2, borderColor: grey[200], bgcolor: grey[200] }}>
        <TabList onChange={handleChange} centered>
          <Tab
            icon={<Login />}
            iconPosition="start"
            //label='Acessar'
            value="sign-in"
          />
          <Tab
            icon={<HowToReg />}
            iconPosition="start"
            //label='Registrar'
            value="sign-up"
          />
          <Tab
            icon={<LockReset />}
            iconPosition="start"
            //label='Redefinir'
            value="reset-password"
          />
        </TabList>
      </Box>
      <TabPanel value="sign-in">
        <AuthSignInForm />
      </TabPanel>
      <TabPanel value="sign-up">
        <AuthSignUpForm />
      </TabPanel>
      <TabPanel value="reset-password">
        <AuthResetPasswordForm />
      </TabPanel>
    </TabContext>
  )
}
