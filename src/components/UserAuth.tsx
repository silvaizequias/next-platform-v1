'use client'

import SignInFormView from '@/app/main/(auth)/autenticar-se/views/SignInFormView'
import ResetPasswordFormView from '@/app/main/(auth)/redefinir-senha/views/ResetPasswordFormView'
import SignUpFormView from '@/app/main/(auth)/registrar-se/views/SignUpFormView'
import { AssignmentInd, Login, Password } from '@mui/icons-material'
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  colors,
  Box,
  Tab,
  Tabs,
  Typography,
  Stack,
} from '@mui/material'
import { Fragment, SyntheticEvent, useCallback, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default function UserAuth() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Fragment>
      <Tooltip title={'autenticar-se'} onClick={handleDialog}>
        <IconButton sx={{ p: 1 }}>
          <Login fontSize="medium" color="action" sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleDialog}
        maxWidth={'xs'}
      >
        <DialogTitle sx={{ fontWeight: 600, color: colors.blue[400] }}>
          {'dedicado'}
        </DialogTitle>
        <DialogContent>
          <Stack sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab icon={<Login />} value={0} />
                <Tab icon={<AssignmentInd />} value={1} />
                <Tab icon={<Password />} value={2} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SignInFormView />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SignUpFormView />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <ResetPasswordFormView />
            </CustomTabPanel>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
