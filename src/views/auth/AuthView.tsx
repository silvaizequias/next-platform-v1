'use client'

import * as React from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import SignInForm from './forms/SignInForm'
import SignUpForm from './forms/SignUpForm'
import ResetPasswordForm from './forms/ResetPasswordForm'
import { MdAppRegistration, MdLockReset, MdLogin } from 'react-icons/md'
import { blue } from '@mui/material/colors'

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 },
}))

export default function AuthView() {
  const [value, setValue] = React.useState<string>('signin')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: blue[800],
      }}
    >
      <Box className='content-center'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Typography
            variant='h4'
            color='white'
            textTransform='uppercase'
            text-align='center'
          >
            Dedicado Digital
          </Typography>
        </Box>
        <Card sx={{ zIndex: 1 }}>
          <CardContent
            sx={{ p: (theme) => `${theme.spacing(2, 2)} !important` }}
          >
            <Box sx={{ width: '100%', typography: 'subtitle' }}>
              <TabContext value={value}>
                <Box
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label='auth tab'
                    centered
                  >
                    <Tab sx={{fontSize: 24}} icon={<MdLogin />} value='signin' />
                    <Tab sx={{fontSize: 24}} icon={<MdAppRegistration />} value='signup' />
                    <Tab sx={{fontSize: 24}} icon={<MdLockReset />} value='reset-password' />
                  </TabList>
                </Box>
                <TabPanel value='signin'>
                  <SignInForm />
                </TabPanel>
                <TabPanel value='signup'>
                  <SignUpForm />
                </TabPanel>
                <TabPanel value='reset-password'>
                  <ResetPasswordForm />
                </TabPanel>
              </TabContext>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
