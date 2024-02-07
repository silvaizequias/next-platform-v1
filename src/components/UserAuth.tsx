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
import TabPanel from './TabPanel'

export default function UserAuth() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const [value, setValue] = useState<number>(0)

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
            <TabPanel value={value} index={0}>
              <SignInFormView />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUpFormView />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ResetPasswordFormView />
            </TabPanel>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
