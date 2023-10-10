import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Divider, Tab } from '@mui/material'
import { Fragment, SyntheticEvent, useState } from 'react'
import AuthSignInForm from './forms/AuthSignInForm'
import AuthSignUpForm from './forms/AuthSignUpForm'
import AuthResetPasswordForm from './forms/AuthResetPasswordForm'
import { MdBadge, MdOutlineLogin, MdOutlinePassword } from 'react-icons/md'
import { signIn } from 'next-auth/react'
import { blue } from '@mui/material/colors'
import { FcGoogle } from 'react-icons/fc'
import { usePathname } from 'next/navigation'

export default function AuthTabsView() {
  const [value, setValue] = useState<string>('sign-in')
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const pathname = usePathname()

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        typography: 'body1',
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered>
            <Tab
              icon={<MdOutlineLogin />}
              iconPosition='start'
              label='Acessar'
              value='sign-in'
            />
            <Tab
              icon={<MdBadge />}
              iconPosition='start'
              label='Registrar'
              value='sign-up'
            />
            <Tab
              icon={<MdOutlinePassword />}
              iconPosition='start'
              label='Redefinir'
              value='reset-password'
            />
          </TabList>
        </Box>
        <TabPanel value='sign-in'>
          <AuthSignInForm />
        </TabPanel>
        <TabPanel value='sign-up'>
          <AuthSignUpForm />
        </TabPanel>
        <TabPanel value='reset-password'>
          <AuthResetPasswordForm />
        </TabPanel>
      </TabContext>
      {pathname !== '/' && (
        <Fragment>
          <Divider
            sx={{
              textAlign: 'center',
              color: blue[600],
              textTransform: 'uppercase',
              fontSize: 9,
            }}
          >
            ou
          </Divider>
          <Button
            size='small'
            variant='contained'
            color='info'
            sx={{ m: 2 }}
            onClick={handleGoogleSignIn}
            startIcon={<FcGoogle />}
          >
            Acesse com o Google
          </Button>
        </Fragment>
      )}
    </Box>
  )
}
